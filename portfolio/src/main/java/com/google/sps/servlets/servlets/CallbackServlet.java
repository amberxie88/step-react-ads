// Copyright 2018 Google LLC
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


@WebServlet("/oauth2callback")
public class CallbackServlet extends HttpServlet {

  private static final ImmutableList<String> SCOPES =
    ImmutableList.<String>builder().add("https://www.googleapis.com/auth/adwords").build();
  private static final String OAUTH2_CALLBACK = "/oauth2callback";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String state = request.getParameter("state");
    String code = request.getParameter("code");
    String scope = request.getParameter("scope");
    String completeUrl = "http://localhost:8080/oauth2callback?" + request.getQueryString(); 
    AuthorizationResponse authorizationResponse = new AuthorizationResponse(completeUrl);

    String statusMessage = processAuthorizationResponse(authorizationResponse, request.getSession().getId());
    response.setContentType("application/json");
    response.getWriter().println(statusMessage); 
  }

  private String processAuthorizationResponse(AuthorizationResponse authorizationResponse, String sessionId) {
    if (authorizationResponse.code == null) {
      return "Invalid Request: Code not provided";
    }
    if (sessionStateExists(authorizationResponse.state.toString(), sessionId)) {
      URI baseUri = URI.create("http://localhost:8080/");
      String clientId = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_ID");
      String clientSecret = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_SECRET");
      UserAuthorizer userAuthorizer =
          UserAuthorizer.newBuilder()
              .setClientId(ClientId.of(clientId, clientSecret))
              .setScopes(SCOPES)
              .setCallbackUri(URI.create(OAUTH2_CALLBACK))
              .build();
      try {
        UserCredentials userCredentials = userAuthorizer.getCredentialsFromCode(authorizationResponse.code, baseUri);
        DatastoreRetrieval.addCredentialToDatastore("refresh", userCredentials.getRefreshToken());
        return "Your Refresh Token has been generated";
      } catch (Exception e) {
        return "Failed to generate Refresh Token";
      }
    } else {
      return "Invalid Request: State does not exist"; 
    }
  }

  private boolean sessionStateExists(String state, String sessionId) {
    Query query = new Query("OAuth");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (state.equals(entity.getProperty("state")) && sessionId.equals(entity.getProperty("sessionId"))) {
        datastore.delete((com.google.appengine.api.datastore.Key) entity.getKey());
        return true; 
      }
    }
    return false;
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
}