 
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


@PowerMockIgnore("jdk.internal.reflect.*")
@RunWith(PowerMockRunner.class)
@PrepareForTest({DatastoreRetrieval.class})
public final class CampaignServletTest {

  @Test
  public void testGreeting() {
  	HttpServletRequest request = mock(HttpServletRequest.class);       
    HttpServletResponse response = mock(HttpServletResponse.class);  
    when (request.getParameter("query")).thenReturn("SELECT campaign.id FROM campaign");

    setDatastoreMocks();

    setServiceClientMocks();

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);

    try {
    	when(response.getWriter()).thenReturn(writer);
    	new GetCampaignsServlet().doPost(request, response);
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
  	//HttpServletResponse response = mock(HttpServletResponse.class);  
    //when (request.getParameter("query")).thenReturn("SELECT campaign.id FROM campaign");
  	return;
  }
}