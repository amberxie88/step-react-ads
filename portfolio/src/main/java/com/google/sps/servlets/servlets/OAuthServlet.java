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
import java.math.BigInteger;
import java.net.URI;
import java.security.SecureRandom;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;

import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.ReadProperties;

import com.google.sps.utils.Constants;

/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/oauth")
public class OAuthServlet extends HttpServlet {

  private static final ImmutableList<String> SCOPES =
      ImmutableList.<String>builder().add("https://www.googleapis.com/auth/adwords").build();
  private static final String OAUTH2_CALLBACK = "/oauth2callback";
  private static final String RETRIEVAL_ERROR = "<h1>Error with retrieving the authorizationLink</h1>";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Add credentials to datastore (just do this once for deployment)
    //addCredentialsToDatastore();

    String clientId = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_ID);
    String clientSecret = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_SECRET);
    String loginEmailAddressHint = null;
    String sessionId = (String) request.getSession().getId();

    response.setContentType("text/html;");
    try {
      String authorizationLink = getAuthorizationUrl(clientId, clientSecret, loginEmailAddressHint, sessionId);
      response.getWriter().println(authorizationLink);
    } catch (Exception e) {
      response.getWriter().println(RETRIEVAL_ERROR);
      System.out.println(e);
    }
  }

  public String getAuthorizationUrl(String clientId, String clientSecret, String loginEmailAddressHint, String sessionId)
      throws Exception {
    // Creates an anti-forgery state token as described here:
    // https://developers.google.com/identity/protocols/OpenIDConnect#createxsrftoken
    String state = new BigInteger(130, new SecureRandom()).toString(32);

    // Saves state in datastore
    DatastoreRetrieval.addEntityToDatastore(Constants.OAUTH, sessionId, state);
    
    UserAuthorizer userAuthorizer =
          UserAuthorizer.newBuilder()
              .setClientId(ClientId.of(clientId, clientSecret))
              .setScopes(SCOPES)
              .setCallbackUri(URI.create(OAUTH2_CALLBACK))
              .build();
      //URI baseUri = URI.create("http://localhost:8080/");
      //deploy
      URI baseUri = URI.create("http://app-infra-transformer-step.appspot.com/");
      return userAuthorizer.getAuthorizationUrl(loginEmailAddressHint, state, baseUri).toString();
  }
  

  private void addCredentialsToDatastore() {
    try {
      ReadProperties properties = new ReadProperties("config.properties");
      DatastoreRetrieval.addEntityToDatastore(Constants.SETTINGS, Constants.CLIENT_ID, properties.getProp("clientId"));
      DatastoreRetrieval.addEntityToDatastore(Constants.SETTINGS, Constants.CLIENT_SECRET, properties.getProp("clientSecret"));
      DatastoreRetrieval.addEntityToDatastore(Constants.SETTINGS, Constants.DEVELOPER_TOKEN, properties.getProp("devToken"));      
    } catch (Exception e) {
      System.err.println(e);
    }
  }
}