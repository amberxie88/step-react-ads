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

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.auth.Credentials;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamResponse;
import com.google.sps.servlets.GetCampaignsServlet;

import org.mockito.Mockito;
import static org.mockito.Mockito.*;
import org.powermock.api.mockito.PowerMockito;
import static org.powermock.api.mockito.PowerMockito.when;

import java.util.ArrayList;
import com.google.api.gax.rpc.PermissionDeniedException;
import com.google.api.gax.rpc.InvalidArgumentException;

import org.json.JSONObject;


class MockCampaignsServlet extends GetCampaignsServlet {
  GoogleAdsClient gac = mock(GoogleAdsClient.class);
  GoogleAdsServiceClient gasc = PowerMockito.mock(GoogleAdsServiceClient.class);
  SearchGoogleAdsStreamRequest request = PowerMockito.mock(SearchGoogleAdsStreamRequest.class);
  String sessionId;
  String refreshToken;
  String queryResponse;
  long loginCustomerId;

  public MockCampaignsServlet() {
    super();
  }

  public MockCampaignsServlet(String sessionId, String refreshToken, String queryResponse) {
    super();
    this.sessionId = sessionId;
    this.refreshToken = refreshToken;
    this.queryResponse = queryResponse;
  }

  @Override
  protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken, long loginCustomerId) throws Exception {
    if (c == null || developerToken == null) {
      throw new Exception("Cannot build GoogleAdsClient");
    }
    this.loginCustomerId = loginCustomerId;
    return gac;
  }

  @Override
  protected GoogleAdsServiceClient createGoogleAdsServiceClient(GoogleAdsClient googleAdsClient) {
     PowerMockito.doNothing().when(gasc).close();
    return gasc;
  }

  @Override
  protected SearchGoogleAdsStreamRequest buildSearchGoogleAdsStreamRequest(String query, long customerId) {
    //if sessionId or if customer Id is wrong?
    long refreshUser = Long.parseLong(refreshToken);
    if (!(refreshUser == customerId || refreshUser == loginCustomerId)) {
      PermissionDeniedException pde = mock(PermissionDeniedException.class);
      when (pde.getMessage()).thenReturn("Refresh token is not valid");
      throw pde;
    }  else if (!query.equals("valid")) {
      InvalidArgumentException iae = mock(InvalidArgumentException.class);
      when (iae.toString()).thenReturn("Query is not valid");
      throw iae;
    }
    return request;
  }

  @Override
  protected Iterable<SearchGoogleAdsStreamResponse> issueSearchGoogleAdsStreamRequest(GoogleAdsServiceClient googleAdsServiceClient, SearchGoogleAdsStreamRequest request) {
    // Returns Iterable with one mocked object
    ArrayList<SearchGoogleAdsStreamResponse> lst = new ArrayList<>();
    SearchGoogleAdsStreamResponse rsp = PowerMockito.mock(SearchGoogleAdsStreamResponse.class);
    lst.add(rsp);
    return (Iterable<SearchGoogleAdsStreamResponse>) lst;
  }
  
  @Override
  protected String searchGoogleAdsStreamResponseToJSON(SearchGoogleAdsStreamResponse response) {
    return queryResponse;
  }
  @Override
  public String processErrorJSON(String errorMessage, String errorCode) {
    return super.processErrorJSON(errorMessage, errorCode); 
  }

  @Override
  public String getValueFromJSON(JSONObject object, String requestedValue) {
    return super.getValueFromJSON(object, requestedValue);
  }

  @Override 
  public String processJSON(String json) {
    return super.processJSON(json);
  }

  @Override
  public String runExample(long loginId, long customerId, String query, String sessionId) {
    return super.runExample(loginId, customerId, query, sessionId);
  }
}