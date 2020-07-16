package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;

public class DatastoreRetrieval {
  // TOOD: make more efficient, but this works for now.
  public static String getCredentialFromDatastore(String name) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Settings");
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (name.equals(entity.getProperty("name"))) {
        return entity.getProperty("value").toString();
      }
    }
    return null;
  }
  //Client ID and Client Secret and Dev Token
  public static void addCredentialToDatastore(String name, String value) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity oauthEntity = new Entity("Settings");
    oauthEntity.setProperty("name", name);
    oauthEntity.setProperty("value", value);
    datastore.put(oauthEntity);
  }

  //Refresh Token linked to Session ID
  public static void addRefreshToDatastore(String value, String sessionId) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity refreshEntity = new Entity("Refresh");
    refreshEntity.setProperty("value", value);
    refreshEntity.setProperty("sessionId", sessionId);
    datastore.put(refreshEntity);
  }

  //Refresh Token linked to Session ID
  public static String getRefreshFromDatastore(String sessionId) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Refresh");
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (sessionId.equals(entity.getProperty("sessionId"))) {
        return entity.getProperty("value").toString();
      }
    }
    return null;
  }

  //Client linked to Session ID
  public static void addClientToDatastore(String loginId, String customerId, String sessionId) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity clientEntity = new Entity("Client");
    clientEntity.setProperty("loginId", loginId);
    clientEntity.setProperty("customerId", customerId);
    clientEntity.setProperty("sessionId", sessionId);
    datastore.put(clientEntity);
  }

  //Client linked to Session ID
  public static String getClientFromDatastore(String name, String sessionId) {
    System.out.println(sessionId);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query("Client");
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (sessionId.equals(entity.getProperty("sessionId"))) {
        return entity.getProperty(name).toString();
      }
    }
    return null;
  }
}