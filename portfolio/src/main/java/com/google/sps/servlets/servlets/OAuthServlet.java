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
import java.math.BigInteger;
import java.net.URI;
import java.security.SecureRandom;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.sps.data.DatastoreRetrieval;

/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/oauth")
public class OAuthServlet extends HttpServlet {

  private static final ImmutableList<String> SCOPES =
      ImmutableList.<String>builder().add("https://www.googleapis.com/auth/adwords").build();
  private static final String OAUTH2_CALLBACK = "/oauth2callback";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {


    //client id/secret (for dev)
    //add credentials to datastore (just do this once for deployment)
    DatastoreRetrieval.addEntityToDatastore("Settings", "CLIENT_ID", "142848730576-uog0d63i39k3j70srtood666nbir7n2q.apps.googleusercontent.com");
    DatastoreRetrieval.addEntityToDatastore("Settings", "CLIENT_SECRET", "QzSkcgeycOr97jN7G5VXv3sL");
    DatastoreRetrieval.addEntityToDatastore("Settings", "DEVELOPER_TOKEN", "88tjUiP6A11wwfJDltVL4w");
    
    String clientId = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID");
    String clientSecret = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET");

    String loginEmailAddressHint = null;
    String sessionId = (String) request.getSession().getId();
    System.out.println("sessionId: " + sessionId);
    System.out.println("clientId: " + clientId);
    System.out.println("clientSecret: " + clientSecret);

    response.setContentType("text/html;");
    try {
      String authorizationLink = new OAuthServlet().runExample(clientId, clientSecret, loginEmailAddressHint, sessionId);
      System.out.println("redirecting");
      System.out.println(authorizationLink);
      response.getWriter().println(authorizationLink);
    } catch (Exception e) {
      response.getWriter().println("<h1>Error with retrieving the authorizationLink</h1>");
      System.out.println(e);
    }
  }

  public String runExample(String clientId, String clientSecret, String loginEmailAddressHint, String sessionId)
      throws Exception {
    // Creates an anti-forgery state token as described here:
    // https://developers.google.com/identity/protocols/OpenIDConnect#createxsrftoken
    String state = new BigInteger(130, new SecureRandom()).toString(32);

    // Saves state in datastore
    DatastoreRetrieval.addEntityToDatastore("OAuth", sessionId, state);
    System.out.println("Putting a new state");


    // Creates an HTTP server that will listen for the OAuth2 callback request.
    URI baseUri;
    UserAuthorizer userAuthorizer;
    AuthorizationResponse authorizationResponse = null;
    
    userAuthorizer =
          UserAuthorizer.newBuilder()
              .setClientId(ClientId.of(clientId, clientSecret))
              .setScopes(SCOPES)
              .setCallbackUri(URI.create(OAUTH2_CALLBACK))
              .build();
      //baseUri = URI.create("http://localhost:8080/");
      //deploy
      baseUri = URI.create("http://app-infra-transformer-step.appspot.com/");
      
      System.out.printf(
          "Paste this url in your browser:%n%s%n",
          userAuthorizer.getAuthorizationUrl(loginEmailAddressHint, state, baseUri));
      return userAuthorizer.getAuthorizationUrl(loginEmailAddressHint, state, baseUri).toString();
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
