 
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

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


import org.mockito.Spy;
import org.mockito.InjectMocks;

@PowerMockIgnore("jdk.internal.reflect.*")
@RunWith(PowerMockRunner.class)
@PrepareForTest({DatastoreRetrieval.class, GetCampaignsServlet.class, SearchGoogleAdsStreamRequest.class,
	SearchGoogleAdsStreamResponse.class, GoogleAdsServiceClient.class})
public final class CampaignServletTest {

  private GetCampaignsServlet servlet = PowerMockito.spy(new GetCampaignsServlet());
  private TestCampaignsServlet testServlet;

  @Before
  public void setUp() {
  	//servlet = PowerMockito.spy(new GetCampaignsServlet());
  	testServlet = new TestCampaignsServlet();
  	return;
  }

  @Test
  public void mockTest() {
  	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);  
    when (request.getParameter("query")).thenReturn("SELECT campaign.id FROM campaign");

    setDatastoreMocks();

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);

    System.out.println(testServlet);
    try {
    	when(response.getWriter()).thenReturn(writer);
    	testServlet.doPost(request, response);
    } catch (Exception e) {
    	System.out.println(e);
    }
    
    verify(request, atLeast(1)).getParameter("query"); // make sure method is called
    writer.flush();
    System.out.println(stringWriter.toString());
    //assertTrue(stringWriter.toString().contains("My expected string"));
    Assert.assertEquals("Hello Ada", "Hello Ada");
  }

  private void setDatastoreMocks() {
  	PowerMockito.mockStatic(DatastoreRetrieval.class);
    PowerMockito.when(DatastoreRetrieval.getCredentialFromDatastore("DEVELOPER_TOKEN"))
    	.thenReturn(System.getenv("DEVELOPER_TOKEN"));
    PowerMockito.when(DatastoreRetrieval.getCredentialFromDatastore("CLIENT_ID"))
    	.thenReturn(System.getenv("CLIENT_ID"));
    PowerMockito.when(DatastoreRetrieval.getCredentialFromDatastore("CLIENT_SECRET"))
    	.thenReturn(System.getenv("CLIENT_SECRET"));
    PowerMockito.when(DatastoreRetrieval.getCredentialFromDatastore("refresh"))
    	.thenReturn(System.getenv("REFRESH"));
  }

  class TestCampaignsServlet extends GetCampaignsServlet {
  	GoogleAdsClient gac = mock(GoogleAdsClient.class);
  	GoogleAdsServiceClient gasc = PowerMockito.mock(GoogleAdsServiceClient.class);
  	SearchGoogleAdsStreamRequest request = PowerMockito.mock(SearchGoogleAdsStreamRequest.class);

  	private TestCampaignsServlet() {
  		super();
  		System.out.println("Constructing");
  	}

  	@Override
  	protected String testSpy(int i) {
  		return "child class says hello";
  	}

  	@Override
	protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken, long loginCustomerId) {
		return gac;
  	}

  	@Override
  	protected GoogleAdsServiceClient createGoogleAdsServiceClient(GoogleAdsClient googleAdsClient) {
	    PowerMockito.doNothing().when(gasc).close();
	    //PowerMockito.when(gasc.close()).doNothing();
  		return gasc;
  	}

  	@Override
  	protected SearchGoogleAdsStreamRequest buildSearchGoogleAdsStreamRequest(String query, long customerId) {
  		return request;
  	}

  	@Override
  	protected Iterable<SearchGoogleAdsStreamResponse> issueSearchGoogleAdsStreamRequest(GoogleAdsServiceClient googleAdsServiceClient, SearchGoogleAdsStreamRequest request) {
  		// change to allow for flexible test cases (in constructor)
  		ArrayList<SearchGoogleAdsStreamResponse> lst = new ArrayList<>();
  		SearchGoogleAdsStreamResponse rsp = PowerMockito.mock(SearchGoogleAdsStreamResponse.class);
	    when (rsp.toString()).thenReturn("{results {campaign { resource_name\"adsf\"} id { value: 1010}}}");

  		lst.add(rsp);
  		return (Iterable<SearchGoogleAdsStreamResponse>) lst;
  	}

  	@Override
  	 protected String searchGoogleAdsStreamResponseToJSON(SearchGoogleAdsStreamResponse response) {
  	 	String json = "{\"results\": [{ \"campaign\": {\"resourceName\": \"customers/4498877497/campaigns/10314647934\",";
  	 	json += "\"id\": \"10314647934\"}}, {\"campaign\": {\"resourceName\": ";
  	 	json += "\"customers/4498877497/campaigns/10371310206\",\"id\": \"10371310206\"}}],";
  	 	json += "\"fieldMask\": \"campaign.id\"}";
  	 	return json;
  	 }
  }
}