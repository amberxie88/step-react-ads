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
import com.google.sps.utils.Constants;

public class CredentialRetrieval {
  
  public static Credentials getCredentials(String sessionId) {
	String CLIENT_ID = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_ID);
	String CLIENT_SECRET = DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.CLIENT_SECRET);
	String REFRESH_TOKEN = DatastoreRetrieval.getEntityFromDatastore(Constants.REFRESH, sessionId);

	Credentials credentials = UserCredentials.newBuilder().setClientId(CLIENT_ID)
	  .setClientSecret(CLIENT_SECRET).setRefreshToken(REFRESH_TOKEN).build();
	return credentials;
  }
}