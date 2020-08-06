// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
package com.google.sps.servlets;

import java.io.IOException;
import java.io.FileNotFoundException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.util.Key;
import com.google.auth.oauth2.ClientId;
import com.google.auth.oauth2.UserAuthorizer;
import com.google.auth.oauth2.UserCredentials;
import com.google.common.base.MoreObjects;
import com.google.common.collect.ImmutableList;
import java.net.URI;

import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.sps.data.DatastoreRetrieval;

import com.google.sps.utils.Constants;


@WebServlet("/oauth2callback")
public class CallbackServlet extends HttpServlet {

  private static final ImmutableList<String> SCOPES =
    ImmutableList.<String>builder().add("https://www.googleapis.com/auth/adwords").build();
  private static final String OAUTH2_CALLBACK = "/oauth2callback";
  private static final String INVALID_CODE = "Invalid Request: Code not provided";
  private static final String INVALID_STATE = "Invalid Request: State does not exist";
  private static final String TOKEN_GRANTED = "Your Refresh Token has been generated";
  private static final String TOKEN_FAILED = "Failed to generate Refresh Token";
  private static final String COMPLETE_URL_LOCAL = "http://localhost:8080/oauth2callback?";
  private static final String COMPLETE_URL_DEPLOY = "http://app-infra-transformer-step.appspot.com/oauth2callback?";
  private static final String RETURN_LINK_LOCAL = "<h3><a href='http://localhost:8080'>Return to website.</a></h3>";
  private static final String RETURN_LINK_DEPLOY = "<h3><a href='http://app-infra-transformer-step.appspot.com'>Return to website.</a></h3>";
  private static final String BASE_URI_LOCAL = "http://localhost:8080/";
  private static final String BASE_URI_DEPLOY = "http://app-infra-transformer-step.appspot.com/";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String state = request.getParameter("state");
    String code = request.getParameter("code");
    String scope = request.getParameter("scope");
    String completeUrl = COMPLETE_URL_DEPLOY + request.getQueryString(); 
    AuthorizationResponse authorizationResponse = new AuthorizationResponse(completeUrl);

    String statusMessage = processAuthorizationResponse(authorizationResponse, request.getSession().getId());
    writeStatusMessage(response, statusMessage);
  }

  /** Response object with attributes corresponding to OAuth2 callback parameters. */
  static class AuthorizationResponse extends GenericUrl {

    /** The authorization code to exchange for an access token and (optionally) a refresh token. */
    @Key String code;

    /** Error from the request or from the processing of the request. */
    @Key String error;

    /** State parameter from the callback request. */
    @Key String state;

    /**
     * Constructs a new instance based on an absolute URL. All fields annotated with the {@link Key}
     * annotation will be set if they are present in the URL.
     *
     * @param encodedUrl absolute URL with query parameters.
     */
    public AuthorizationResponse(String encodedUrl) {
      super(encodedUrl);
    }

    @Override
    public String toString() {
      return MoreObjects.toStringHelper(getClass())
          .add("code", code)
          .add("error", error)
          .add("state", state)
          .toString();
    }
  }

  private String processAuthorizationResponse(AuthorizationResponse authorizationResponse, String sessionId) {
    System.out.println("Processing");
    if (authorizationResponse.code == null) {
      return INVALID_CODE;
    }
    if (sessionStateExists(authorizationResponse.state.toString(), sessionId)) {
      URI baseUri = URI.create(BASE_URI_DEPLOY);
      String clientId = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_ID);
      String clientSecret = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_SECRET);
      UserAuthorizer userAuthorizer =
          UserAuthorizer.newBuilder()
              .setClientId(ClientId.of(clientId, clientSecret))
              .setScopes(SCOPES)
              .setCallbackUri(URI.create(OAUTH2_CALLBACK))
              .build();
      try {
        UserCredentials userCredentials = userAuthorizer.getCredentialsFromCode(authorizationResponse.code, baseUri);
        DatastoreRetrieval.addEntityToDatastore(Constants.REFRESH, sessionId, userCredentials.getRefreshToken());
        System.out.println("refresh token generated: " + userCredentials.getRefreshToken());
        return TOKEN_GRANTED;
      } catch (Exception e) {
        System.out.println(e.toString());
        return TOKEN_FAILED + e.toString();
      }
    } else {
      return INVALID_STATE; 
    }
  }

  //remove the OAuth Entity (session, state) from Datastore
  private boolean sessionStateExists(String state, String sessionId) {
    Query query = new Query("OAuth");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    boolean matchState = false;
    String entityState;
    String entitySession;
    for (Entity entity: results.asIterable()) {
      entitySession = (String) entity.getProperty("index");
      entityState = (String) entity.getProperty("value");
      if (sessionId.equals(entitySession)) {
        datastore.delete((com.google.appengine.api.datastore.Key) entity.getKey());
        if (state.equals(entityState)) {
          matchState =  true; 
        }
      }
    }
    return matchState;
  }

  private void writeStatusMessage(HttpServletResponse response, String statusMessage) {
    response.setContentType("text/html;");
    try {
      response.getWriter().println("<h1>" + statusMessage + "</h1>");
      response.getWriter().println(RETURN_LINK_DEPLOY);     
    } catch (Exception e) {
      System.err.println(e);
    }
  }
}