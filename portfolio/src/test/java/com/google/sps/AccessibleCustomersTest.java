 
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
import com.google.sps.servlets.AccessibleCustomersServlet;
import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;
import com.google.sps.MockAccessibleCustomersServlet;

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
import com.google.ads.googleads.v3.services.ListAccessibleCustomersResponse;
import com.google.ads.googleads.v3.services.CustomerServiceClient;
import com.google.ads.googleads.v3.resources.CustomerClient;

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
@PrepareForTest({DatastoreRetrieval.class, AccessibleCustomersServlet.class, CustomerServiceClient.class,
	ListAccessibleCustomersResponse.class, CredentialRetrieval.class})
public final class AccessibleCustomersTest {

	@Test
	public void processErrorJSONTest() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		String errorJSON = testServlet.processErrorJSON("My error message is here", "300");
		String expectedJSON = getStringFromFile("expectedJSON/processErrorJSON1.txt");
		System.out.println(errorJSON);
		System.out.println(expectedJSON);
		Assert.assertTrue(equivalentJSON(expectedJSON, errorJSON));  
	}

	//test creaateCustomerClientToHierarchy()
	@Test
	public void createCustomerClientToHierarchy1() {
		String sessionId = "sessionId";
		String seedId = "1111";
		String loginId = "0000";
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> expected = new ArrayList<>();
		try {
			ArrayList<CustomerClient> output = testServlet.createCustomerClientToHierarchy(loginId, seedId, sessionId);
			System.out.println(expected);
			System.out.println(output);
			Assert.assertEquals(expected, output);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	//test buildAccountHierarchy()
	@Test
	public void buildAccountHierarchy1() {
		MockAccessibleCustomersServlet testServlet = new MockAccessibleCustomersServlet();
		ArrayList<CustomerClient> output = new ArrayList<>();
		ArrayList<CustomerClient> expected = new ArrayList<>();
		//create mock customerClients class!
		//build individual, then multimap of customerClients
		//CustomerClient customerClient = mock(CustomerClient.class);
		testServlet.buildAccountHierarchy(customerClient, customerIdsToChildAccounts, 0, output);
		System.out.println(expected);
		System.out.println(output);
		Assert.assertEquals(expected, output);

		CustomerClient customerClient,
      Multimap<Long, CustomerClient> customerIdsToChildAccounts,
      int depth, ArrayList<CustomerClient> accountHierarchies	
	}

	// @Test
	// public void simpleQuery() {
	// 	/* setup begins */
	// 	System.out.println("simple query");
	// 	HttpServletRequest request = mock(HttpServletRequest.class);       
	// 	HttpServletResponse response = mock(HttpServletResponse.class);

	// 	String sessionId = "sessionId";
	// 	String customerId = "1111";
	// 	String loginId = "0000";
	// 	String refreshToken = "0000"; 
	// 	String query = "valid";
	// 	if (1 == 1) {
	// 		return;
	// 	}

	// 	prepStaticMocks();
	// 	setHTTPMocks(request, response, sessionId, query);
	// 	setCredentialMocks("developerToken", "clientId", "clientSecret");
	// 	setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
	// 	MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

	// 	StringWriter stringWriter = new StringWriter();
	// 	PrintWriter writer = new PrintWriter(stringWriter);
	// 	/* setup ends */
	// 	try {
	// 		when(response.getWriter()).thenReturn(writer);
	// 		testServlet.doPost(request, response);
	// 	} catch (Exception e) {
	// 		System.out.println(e);
	// 	}

	// 	writer.flush();

	// 	// things you need: 
	// 	// request, response
	// 	// I don't think you actually need sessionId, customerId, etc. nor do you need client ID
	// 	// writer (because you need to flush and get it toString -> but the when part can be done in setup??)
	// 	// what is the cleanest way to do this? you can read from a file, but seems like too much. Passing in that many parameters is a lot.

	// 	String expectedJSON = getStringFromFile("expectedJSON/simpleQuery1.txt");
	// 	System.out.println(stringWriter.toString());
	// 	Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  	 
	// }

	// @Test 
	// public void invalidQuery() {
	// 	HttpServletRequest request = mock(HttpServletRequest.class);       
	// 	HttpServletResponse response = mock(HttpServletResponse.class);

	// 	String sessionId = "sessionId";
	// 	String customerId = "1111";
	// 	String loginId = "0000";
	// 	String refreshToken = "0000"; 
	// 	String query = "invalid";

	// 	prepStaticMocks();
	// 	setHTTPMocks(request, response, sessionId, query);
	// 	setCredentialMocks("developerToken", "clientId", "clientSecret");
	// 	setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
	// 	MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

	// 	StringWriter stringWriter = new StringWriter();
	// 	PrintWriter writer = new PrintWriter(stringWriter);
	// 	try {
	// 		when(response.getWriter()).thenReturn(writer);
	// 		testServlet.doPost(request, response);
	// 	} catch (Exception e) {
	// 		System.out.println(e);
	// 	}

	// 	writer.flush();

	// 	String expectedJSON = testServlet.processErrorJSON("Query is not valid", "400");
	// 	Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  	
	// }

	// @Test
	// public void invalidRefreshToken() {
	// 	// Class variable or put in set-up / before
	// 	HttpServletRequest request = mock(HttpServletRequest.class);       
	// 	HttpServletResponse response = mock(HttpServletResponse.class);

	// 	String sessionId = "sessionId";
	// 	String customerId = "1111";
	// 	String loginId = "0000";
	// 	String refreshToken = "8888"; // refresh token should be equal to either customer or login id
	// 	String query = "valid";

	// 	prepStaticMocks();
	// 	setHTTPMocks(request, response, sessionId, query);
	// 	setCredentialMocks("developerToken", "clientId", "clientSecret");
	// 	setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
	// 	MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

	// 	StringWriter stringWriter = new StringWriter();
	// 	PrintWriter writer = new PrintWriter(stringWriter);
	// 	try {
	// 		when(response.getWriter()).thenReturn(writer);
	// 		testServlet.doPost(request, response);
	// 	} catch (Exception e) {
	// 		System.out.println(e);
	// 	}

	// 	writer.flush();

	// 	String expectedJSON = testServlet.processErrorJSON("Refresh token is not valid", "403");
	// 	Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));
	// }

	// // TODO: take out response, not used
	// // take out request, response if they are class vars
	// private void setHTTPMocks(HttpServletRequest request, HttpServletResponse response, String sessionId, String query) {
	// 	when (request.getParameter("query")).thenReturn(query);
	// 	HttpSession session = mock(HttpSession.class);
	// 	when (request.getSession()).thenReturn(session);
	// 	when (session.getId()).thenReturn(sessionId);
	// }

	// // PowerMockito can mock static methods from classes; denote them here.
	// private void prepStaticMocks() {
	// 	PowerMockito.mockStatic(DatastoreRetrieval.class);
	// 	PowerMockito.mockStatic(CredentialRetrieval.class);
	// }

	// private void setCredentialMocks(String developerToken, String clientId, String clientSecret) {
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "DEVELOPER_TOKEN"))
	// 		.thenReturn(developerToken);
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID"))
	// 		.thenReturn(clientId);
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET"))
	// 		.thenReturn(clientSecret);
	// }

	// private void setSessionDependentMocks(String sessionId, String customerId, String loginId, String refreshToken) {
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId))
	// 		.thenReturn(customerId);
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId))
	// 		.thenReturn(loginId);
	// 	PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId))
	// 		.thenReturn(refreshToken);

	// 	Credentials cred = mock(Credentials.class);
	// 	PowerMockito.when(CredentialRetrieval.getCredentials(sessionId))
	// 		.thenReturn(cred);
	//  }
	  
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