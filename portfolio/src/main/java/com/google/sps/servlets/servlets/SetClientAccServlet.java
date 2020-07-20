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

import com.google.gson.Gson;
import com.google.sps.data.Client;


@WebServlet("/client")
public class SetClientAccServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
<<<<<<< HEAD
    System.out.println("getting account");
    

    String sessionId = (String) request.getSession().getId();
    String customerId = DatastoreRetrieval.getClientFromDatastore("customerId", sessionId);
    String loginId = DatastoreRetrieval.getClientFromDatastore("loginId", sessionId);
=======

    System.out.println("getting account");
    String sessionId = (String) request.getSession().getId();
    String customerId = DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId);
    String loginId = DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId);
>>>>>>> 9814b222... hm

    Client client = new Client(loginId, customerId);

    response.setContentType("application/json;");
    response.getWriter().println(new Gson().toJson(client));
  }


  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    System.out.println("setting account");
    
    String loginId = request.getParameter("loginId");
    String customerId = request.getParameter("customerId");
    System.out.println(loginId);
    System.out.println(customerId);

    String sessionId = (String) request.getSession().getId();

<<<<<<< HEAD
    //remove previously set client account
    Query query = new Query("Client");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (sessionId.equals(entity.getProperty("sessionId"))) {
        datastore.delete((com.google.appengine.api.datastore.Key) entity.getKey());
      }
    }
    //add the new selected client
    DatastoreRetrieval.addClientToDatastore(loginId, customerId, sessionId);
=======
    
    DatastoreRetrieval.addEntityToDatastore("LoginId", sessionId, loginId);
    DatastoreRetrieval.addEntityToDatastore("CustomerId", sessionId, customerId);
>>>>>>> 9814b222... hm

    response.setContentType("text/html;");
    response.getWriter().println("Selected account successfully!");
    response.getWriter().println("LoginID: " + loginId); 
    response.getWriter().println("CustomerID: " + customerId); 
  }
} 