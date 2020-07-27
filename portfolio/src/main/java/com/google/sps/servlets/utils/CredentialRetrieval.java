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

import com.google.sps.data.DatastoreRetrieval;
import com.google.auth.oauth2.UserCredentials;
import com.google.auth.Credentials;

public class CredentialRetrieval {
	// TODO: clean up code -- turn "Settings" into a variable in another Java file
	// create Constants.java or for a list of all the constants. 
  
  public static Credentials getCredentials(String sessionId) {
	String CLIENT_ID = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID");
	String CLIENT_SECRET = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET");
	String REFRESH_TOKEN = DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId);

	Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
	  .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
	return credentials;
  }
}