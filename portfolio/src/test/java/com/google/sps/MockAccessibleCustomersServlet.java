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
package com.google.sps;

import java.io.IOException;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.auth.Credentials;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamResponse;
import com.google.sps.servlets.AccessibleCustomersServlet;

import com.google.ads.googleads.v3.services.ListAccessibleCustomersResponse;
import com.google.ads.googleads.v3.services.CustomerServiceClient;
import com.google.ads.googleads.v3.resources.CustomerClient;
import com.google.ads.googleads.v3.resources.Customer;

import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import org.powermock.api.mockito.PowerMockito;
import static org.powermock.api.mockito.PowerMockito.when;

import java.util.ArrayList;
import com.google.api.gax.rpc.PermissionDeniedException;
import com.google.api.gax.rpc.InvalidArgumentException;

import org.json.JSONObject;


class MockAccessibleCustomersServlet extends AccessibleCustomersServlet {
  GoogleAdsClient gac = mock(GoogleAdsClient.class);
  //PowerMockito to mock static classes
  ListAccessibleCustomersResponse lacr = PowerMockito.mock(ListAccessibleCustomersResponse.class);
  CustomerServiceClient csc = PowerMockito.mock(CustomerServiceClient.class);
  String sessionId;
  String refreshToken;
  long loginCustomerId;

  public MockAccessibleCustomersServlet() {
    super();
  }

  public MockAccessibleCustomersServlet(String sessionId, String refreshToken) {
  	super();
  	this.sessionId = sessionId;
  	this.refreshToken = refreshToken;
  }

  @Override
	protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken) {
	  return gac;
  }

  @Override
  protected ListAccessibleCustomersResponse listAccessibleCustomers(CustomerServiceClient c) {
    return lacr;
  }

  @Override
  protected CustomerServiceClient createCustomerServiceClient(GoogleAdsClient client) {
    return csc;
  }

  @Override
  protected ArrayList<CustomerClient> createCustomerClientToHierarchy(
    String loginCustomerIdStr, String seedCustomerIdStr, String sessionId) throws IOException {
    ArrayList<CustomerClient> dummy = new ArrayList<>();
    return dummy;
  }

  //mock run example


  @Override
  public String processErrorJSON(String errorMessage, String errorCode) {
    return super.processErrorJSON(errorMessage, errorCode); 
  }

}