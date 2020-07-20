package com.google.sps.data;

import com.google.sps.data.DatastoreRetrieval;
import com.google.auth.oauth2.UserCredentials;
import com.google.auth.Credentials;

public class CredentialRetrieval {
  
  public static Credentials getCredentials() {
    String CLIENT_ID = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_ID");
    String CLIENT_SECRET = DatastoreRetrieval.getCredentialFromDatastore("CLIENT_SECRET");
    String REFRESH_TOKEN = DatastoreRetrieval.getCredentialFromDatastore("refresh");

    Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
      .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
    //System.out.println(credentials);
    //System.out.println("CLIENT_SECRET");
    //System.out.println(CLIENT_SECRET);
    return credentials;
  }
}