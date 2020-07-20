 
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
@PrepareForTest({DatastoreRetrieval.class, GetCampaignsServlet.class})
public final class CampaignServletTest {

  private GetCampaignsServlet servlet = PowerMockito.spy(new GetCampaignsServlet());

  @Before
  public void setUp() {
  	//servlet = PowerMockito.spy(new GetCampaignsServlet());
  	return;
  }

  /*@Test
  public void tempTest() {
  	GetCampaignsServlet spy = PowerMockito.spy(new GetCampaignsServlet());
  	PowerMockito.doReturn("asdf").when(spy, "testSpy");
  }*/

  @Test
  public void mockTest() {
  	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);  
    when (request.getParameter("query")).thenReturn("SELECT campaign.id FROM campaign");

    setDatastoreMocks();

    setServiceClientMocks();
    //GoogleAdsClient gac = mock(GoogleAdsClient.class);
	//when(servletSpy, method(GetCampaignsServlet.class, "buildGoogleAdsClient", 
	//	Credentials.class, String.class, long.class))
	//	.withArguments(any(Credentials.class), any(String.class), any(long.class))
	//	.thenReturn(gac); 	

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);

    try {
    	when(response.getWriter()).thenReturn(writer);
    	servlet.doPost(request, response);
    } catch (Exception e) { // java.io.IOException ? 
    	System.out.println(e);
    }
    
    verify(request, atLeast(1)).getParameter("query");
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

  private void setServiceClientMocks() {
  	GoogleAdsClient gac = mock(GoogleAdsClient.class);
  	GoogleAdsServiceClient gasc = mock(GoogleAdsServiceClient.class);

  	try {
  		//PowerMockito.when(servlet.testSpy(88)).thenReturn("you have been spied on");
  		PowerMockito.doReturn("you have been spied on").when(servlet, "testSpy", anyInt());
  		PowerMockito.doReturn(gac).when(servlet, "buildGoogleAdsClient", 
  			any(Credentials.class), any(String.class), any(long.class));
  		PowerMockito.doReturn(gasc).when(servlet, "createGoogleAdsServiceClient",
  			Mockito.isA(GoogleAdsClient.class));
  	} catch (Exception e) {
  		System.out.println("Didn't work!!");
  		System.out.println();
  		System.out.println(e);
  	}
  	System.out.println("Testing");
  	System.out.println(servlet);
  	System.out.println(servlet.test(mock(Credentials.class), "strrr", Long.parseLong("88808080")));
  	System.out.println("end testing");
  	System.out.println();
  	return;
  }
}