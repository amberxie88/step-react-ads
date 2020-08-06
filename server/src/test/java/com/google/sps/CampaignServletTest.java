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

package com.google.sps;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.mockito.Mockito.*;
import java.io.*;
import java.util.ArrayList;
import com.google.sps.servlets.GetCampaignsServlet;
import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;
import com.google.sps.MockCampaignsServlet;
import com.google.sps.utils.Constants;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.junit.Before;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.modules.junit4.PowerMockRunner;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.core.classloader.annotations.PowerMockIgnore;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.auth.Credentials;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamResponse;

import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Matchers.anyString;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.support.membermodification.MemberMatcher.method;

import org.json.JSONObject;
import java.io.File;
import org.apache.commons.io.FileUtils;
import java.lang.ClassLoader;

@PowerMockIgnore("jdk.internal.reflect.*")
@RunWith(PowerMockRunner.class)
@PrepareForTest({DatastoreRetrieval.class, GetCampaignsServlet.class, SearchGoogleAdsStreamRequest.class,
	SearchGoogleAdsStreamResponse.class, GoogleAdsServiceClient.class, CredentialRetrieval.class})
public final class CampaignServletTest {

	private static final String SESSION_ID = "sessionId";
	private static final String CUSTOMER_ID = "1111";
	private static final String CUSTOMER_ID_NULL = null;
	private static final String LOGIN_ID = "0000";
	private static final String REFRESH_TOKEN_VALID_0 = "0000";
	private static final String REFRESH_TOKEN_VALID_1 = "1111";
	private static final String REFRESH_TOKEN_INVALID = "8888";
	private static final String QUERY_VALID = "valid";
	private static final String QUERY_INVALID = "invalid";
	private static final String CLIENT_ID = "clientId";
	private static final String CLIENT_SECRET = "clientSecret";
	private static final String CLIENT_SECRET_NULL = null;
	private static final String DEVELOPER_TOKEN = "developerToken";
	private static final String DEVELOPER_TOKEN_NULL = null;

	@Test
	public void processErrorJSON() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String errorJSON = testServlet.processErrorJSON("My error message is here", "300");
		String expectedJSON = getStringFromFile("expectedJSON/processErrorJSON1.txt");
		Assert.assertTrue(equivalentJSON(expectedJSON, errorJSON));  
	}

	@Test
	public void getValueFromJSON_validFullPathToString() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/getValueJSON1.txt");
		JSONObject inputObject = new JSONObject(inputString);
		String value = testServlet.getValueFromJSON(inputObject, "meta.status");
		Assert.assertEquals(Constants.ERROR_300, value);
	}

	@Test(expected = Exception.class)
	public void getValueFromJSON_exceptionOnInvalidPath() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/getValueJSON1.txt");
		JSONObject inputObject = new JSONObject(inputString);
		String value = testServlet.getValueFromJSON(inputObject, "meta.invalid.path");
	}

	@Test
	public void getValueFromJSON_validPathToJSONObject() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/getValueJSON1.txt");
		JSONObject inputObject = new JSONObject(inputString);
		String value = testServlet.getValueFromJSON(inputObject, "meta");
		String expectedString = getStringFromFile("expectedJSON/getValueJSON3.txt");
		Assert.assertTrue(equivalentJSON(expectedString, value));
	}

	@Test
	public void processJSON_simple() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON1.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON1.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test
	public void processJSON_ignoreExtraValues() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON2.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON2.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test
	public void processJSON_returnErrorMessageWithValuesNotFound() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON3.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON3.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test
	public void processJSON_returnErrorJSONWhenNoResult() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON4.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON4.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test
	public void processJSON_returnCurrentJSONOnErrorMeta() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON5.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON5.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test
	public void processJSON_processNormallyOnValidMeta() {
		MockCampaignsServlet testServlet = new MockCampaignsServlet();
		String inputString = getStringFromFile("input/processJSON6.txt");
		String result = testServlet.processJSON(inputString);
		String expectedString = getStringFromFile("expectedJSON/processJSON6.txt");
		Assert.assertTrue(equivalentJSON(expectedString, result));
	}

	@Test 
	public void runExample_validInputs() {
		setupStaticMocks();
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		String queryResponse = "query response";
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, queryResponse);

		String returnResponse = testServlet.runExample(Long.parseLong(LOGIN_ID), Long.parseLong(CUSTOMER_ID), QUERY_VALID, SESSION_ID);
		Assert.assertEquals(queryResponse, returnResponse);
	}

	@Test 
	public void runExample_invalidQuery() {
		setupStaticMocks();
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, "");

		String returnJSON = testServlet.runExample(Long.parseLong(LOGIN_ID), Long.parseLong(CUSTOMER_ID), QUERY_INVALID, SESSION_ID);
		String expectedJSON = testServlet.processErrorJSON("Query is not valid", Constants.ERROR_400);
		Assert.assertTrue(equivalentJSON(expectedJSON, returnJSON));  	
	}

	@Test
	public void runExample_invalidRefreshToken() {
		setupStaticMocks();
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_INVALID);
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_INVALID, "");

		String returnJSON = testServlet.runExample(Long.parseLong(LOGIN_ID), Long.parseLong(CUSTOMER_ID), QUERY_VALID, SESSION_ID);
		String expectedJSON = testServlet.processErrorJSON("Refresh token is not valid", Constants.ERROR_403);
		Assert.assertTrue(equivalentJSON(expectedJSON, returnJSON));
	}

	@Test
	public void runExample_invalidCredentialRetrieval() {
		setupStaticMocks();
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET_NULL, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, "");

		String returnJSON = testServlet.runExample(Long.parseLong(LOGIN_ID), Long.parseLong(CUSTOMER_ID), QUERY_VALID, SESSION_ID);
		String expectedJSON = testServlet.processErrorJSON("java.lang.Exception: Cannot build GoogleAdsClient", Constants.ERROR_503);
		Assert.assertTrue(equivalentJSON(expectedJSON, returnJSON));
	}

	@Test
	public void runExample_invalidDatastoreRetrieval() {
		setupStaticMocks();
		setCredentialMocks(DEVELOPER_TOKEN_NULL, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, "");

		String returnJSON = testServlet.runExample(Long.parseLong(LOGIN_ID), Long.parseLong(CUSTOMER_ID), QUERY_VALID, SESSION_ID);
		String expectedJSON = testServlet.processErrorJSON("java.lang.Exception: Cannot build GoogleAdsClient", Constants.ERROR_503);
		Assert.assertTrue(equivalentJSON(expectedJSON, returnJSON));
	}


	@Test
	public void doPost_simpleQuery() {
		HttpServletRequest request = mock(HttpServletRequest.class);       
		HttpServletResponse response = mock(HttpServletResponse.class);

		setupStaticMocks();
		setHTTPMocks(request, response, SESSION_ID, QUERY_VALID);
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		String queryResponse = getStringFromFile("input/doPost1.txt");
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, queryResponse);

		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		try {
			when(response.getWriter()).thenReturn(writer);
			testServlet.doPost(request, response);
		} catch (Exception e) {
			System.out.println(e);
		}

		writer.flush();

		String expectedJSON = getStringFromFile("expectedJSON/doPost1.txt");
		Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  
	}

	@Test
	public void doPost_nullCustomerId() {
		HttpServletRequest request = mock(HttpServletRequest.class);       
		HttpServletResponse response = mock(HttpServletResponse.class);

		setupStaticMocks();
		setHTTPMocks(request, response, SESSION_ID, QUERY_VALID);
		setCredentialMocks(DEVELOPER_TOKEN, CLIENT_ID, CLIENT_SECRET, SESSION_ID);
		setSessionDependentMocks(SESSION_ID, CUSTOMER_ID_NULL, LOGIN_ID, REFRESH_TOKEN_VALID_0);
		String queryResponse = "";
		MockCampaignsServlet testServlet = new MockCampaignsServlet(SESSION_ID, REFRESH_TOKEN_VALID_0, queryResponse);

		StringWriter stringWriter = new StringWriter();
		PrintWriter writer = new PrintWriter(stringWriter);
		try {
			when(response.getWriter()).thenReturn(writer);
			testServlet.doPost(request, response);
		} catch (Exception e) {
			System.out.println(e);
		}

		writer.flush();

		String expectedJSON = testServlet.processErrorJSON("Null Login ID or Customer ID", Constants.ERROR_500);
		Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  
	}

	private void setHTTPMocks(HttpServletRequest request, HttpServletResponse response, String sessionId, String query) {
		when (request.getParameter("query")).thenReturn(query);
		HttpSession session = mock(HttpSession.class);
		when (request.getSession()).thenReturn(session);
		when (session.getId()).thenReturn(sessionId);
	}

	// PowerMockito can mock static methods from classes; denote them here.
	private void setupStaticMocks() {
		PowerMockito.mockStatic(DatastoreRetrieval.class);
		PowerMockito.mockStatic(CredentialRetrieval.class);
	}

	private void setCredentialMocks(String developerToken, String clientId, String clientSecret, String sessionId) {
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "DEVELOPER_TOKEN"))
			.thenReturn(developerToken);
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID"))
			.thenReturn(clientId);
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET"))
			.thenReturn(clientSecret);
		Credentials cred = mock(Credentials.class);
		if (developerToken != null && clientId != null && clientSecret != null) {
			PowerMockito.when(CredentialRetrieval.getCredentials(sessionId))
				.thenReturn(cred);
		} 

	}

	private void setSessionDependentMocks(String sessionId, String customerId, String loginId, String refreshToken) {
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId))
			.thenReturn(customerId);
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId))
			.thenReturn(loginId);
		PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId))
			.thenReturn(refreshToken);
	 }
	  
	private boolean equivalentJSON(String jsonA, String jsonB) {
		JSONObject jsonObjectA = new JSONObject(jsonA);
		JSONObject jsonObjectB = new JSONObject(jsonB);
		return jsonObjectA.similar(jsonObjectB);
	}

	private String getStringFromFile(String filePath) {
		try {
			File file = new File(this.getClass().getClassLoader().getResource(filePath).getFile());
			String fileString = FileUtils.readFileToString(file);
			return fileString;
		} catch (Exception e) {
			System.out.println("File not found");
			return null;
		}
	}

}