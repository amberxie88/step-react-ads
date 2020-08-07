/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
    // value = LoginID
  //CustomerId:
    // index: sessionId
    // value = CustomerID
 
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