 
// Copyright 2019 Google LLC
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

  private GetCampaignsServlet servlet = PowerMockito.spy(new GetCampaignsServlet());

  @Test
  public void simpleQuery() {
  	System.out.println("simple query");
 	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);
  
    String sessionId = "sessionId";
    String customerId = "1111";
    String loginId = "0000";
    String refreshToken = "0000"; 
    String query = "valid";

    prepStaticMocks();
    setHTTPMocks(request, response, sessionId, query);
    setCredentialMocks("developerToken", "clientId", "clientSecret");
    setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
    MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    try {
    	when(response.getWriter()).thenReturn(writer);
    	testServlet.doPost(request, response);
    } catch (Exception e) {
    	System.out.println(e);
    }
    
    writer.flush();


    String expectedJSON = getStringFromFile("expectedJSON/simpleQuery1.txt");
    Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  	 
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

  @Test 
  public void invalidQuery() {
  	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);
  
    String sessionId = "sessionId";
    String customerId = "1111";
    String loginId = "0000";
    String refreshToken = "0000"; 
    String query = "invalid";

    prepStaticMocks();
    setHTTPMocks(request, response, sessionId, query);
    setCredentialMocks("developerToken", "clientId", "clientSecret");
    setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
    MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    try {
    	when(response.getWriter()).thenReturn(writer);
    	testServlet.doPost(request, response);
    } catch (Exception e) {
    	System.out.println(e);
    }
    
    writer.flush();

    String expectedJSON = testServlet.createErrorJSON("Query is not valid", "400");
    Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));  	
  }

  @Test
  public void invalidRefreshToken() {
  	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);
  
    String sessionId = "sessionId";
    String customerId = "1111";
    String loginId = "0000";
    String refreshToken = "8888"; // refresh token should be equal to either customer or login id
    String query = "valid";

    prepStaticMocks();
    setHTTPMocks(request, response, sessionId, query);
    setCredentialMocks("developerToken", "clientId", "clientSecret");
    setSessionDependentMocks(sessionId, customerId, loginId, refreshToken);
    MockCampaignsServlet testServlet = new MockCampaignsServlet(sessionId, refreshToken);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    try {
    	when(response.getWriter()).thenReturn(writer);
    	testServlet.doPost(request, response);
    } catch (Exception e) {
    	System.out.println(e);
    }
    
    writer.flush();

    String expectedJSON = testServlet.createErrorJSON("Refresh token is not valid", "403");
    Assert.assertTrue(equivalentJSON(expectedJSON, stringWriter.toString()));
  }

  private void setHTTPMocks(HttpServletRequest request, HttpServletResponse response, String sessionId, String query) {
    when (request.getParameter("query")).thenReturn(query);
    HttpSession session = mock(HttpSession.class);
    when (request.getSession()).thenReturn(session);
    when (session.getId()).thenReturn(sessionId);
  }

  // PowerMockito can mock static methods from classes; denote them here.
  private void prepStaticMocks() {
  	PowerMockito.mockStatic(DatastoreRetrieval.class);
    PowerMockito.mockStatic(CredentialRetrieval.class);
  }

  private void setCredentialMocks(String developerToken, String clientId, String clientSecret) {
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "DEVELOPER_TOKEN"))
    	.thenReturn(developerToken);
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID"))
    	.thenReturn(clientId);
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET"))
    	.thenReturn(clientSecret);
  }

  private void setSessionDependentMocks(String sessionId, String customerId, String loginId, String refreshToken) {
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId))
    	.thenReturn(customerId);
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId))
    	.thenReturn(loginId);
    PowerMockito.when(DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId))
    	.thenReturn(refreshToken);

    Credentials cred = mock(Credentials.class);
    PowerMockito.when(CredentialRetrieval.getCredentials(sessionId))
    	.thenReturn(cred);
  }
  
  private boolean equivalentJSON(String jsonA, String jsonB) {
  	JSONObject jsonObjectA = new JSONObject(jsonA);
  	JSONObject jsonObjectB = new JSONObject(jsonB);
  	return jsonObjectA.similar(jsonObjectB);
  }

}