package com.google.sps.data;

import com.google.sps.data.DatastoreRetrieval;
import com.google.auth.oauth2.UserCredentials;
import com.google.auth.Credentials;

public class CredentialRetrieval {
  
<<<<<<< HEAD
  public static Credentials getCredentials(String sessionId) {
    String CLIENT_ID = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_ID");
    String CLIENT_SECRET = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_SECRET");
    //get by sessionID
    String REFRESH_TOKEN = DatastoreRetrieval.getRefreshFromDatastore(sessionId);

    Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
    return credentials;
=======
  // public static Credentials getCredentials(String sessionId) {
  //   String CLIENT_ID = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_ID");
  //   String CLIENT_SECRET = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_SECRET");
  //   //get by sessionID
  //   String REFRESH_TOKEN = DatastoreRetrieval.getRefreshFromDatastore(sessionId);

  //   Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
  //     .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
  //   return credentials;
  // }

  public static Credentials getCredentials(String sessionId) {
  String CLIENT_ID = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID");
  String CLIENT_SECRET = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET");
  String REFRESH_TOKEN = DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId);

  Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
  return credentials;
>>>>>>> 9814b222... hm
  }
}