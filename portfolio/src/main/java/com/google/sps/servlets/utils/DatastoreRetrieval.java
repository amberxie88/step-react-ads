package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
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

  public static void addCredentialToDatastore(String name, String value) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity oauthEntity = new Entity("Settings");
    oauthEntity.setProperty("name", name);
    oauthEntity.setProperty("value", value);
    datastore.put(oauthEntity);
  }
}