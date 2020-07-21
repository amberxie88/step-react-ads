package com.google.sps.data;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.PreparedQuery;

public class DatastoreRetrieval {

  //EntityName: 
    // index:
    // value: 
  //Settings: 
    // index: CLIENT_ID, CLIENT_SECRET, DEVELOPER_TOKEN
    // value
  //OAuth: 
    // index: sessionId
    // value = state token
  //Refresh:
    // index: sessionId
    // value = refresh token
  //LoginId:
    // index: sessionId
    // value = LoginId
  //CustomerId:
    // index: sessionId
    // value = CustomerId
 
  public static String getEntityFromDatastore(String entityName, String index) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query(entityName);
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (index.equals(entity.getProperty("index"))) {
        return entity.getProperty("value").toString();
      }
    }
    return null;
  }

  public static void addEntityToDatastore(String entityName, String index, String value) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity datastoreEntity = new Entity(entityName);
    datastoreEntity.setProperty("index", index);
    datastoreEntity.setProperty("value", value);
    datastore.put(datastoreEntity);
  }

  public static void removeEntityFromDatastore(String entityName, String index) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query = new Query(entityName);
    PreparedQuery results = datastore.prepare(query);
    for (Entity entity: results.asIterable()) {
      if (index.equals(entity.getProperty("index"))) {
        datastore.delete((com.google.appengine.api.datastore.Key) entity.getKey());
      }
    }
  }
}