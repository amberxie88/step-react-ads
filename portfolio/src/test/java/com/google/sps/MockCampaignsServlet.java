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
  long loginCustomerId;

  public MockCampaignsServlet() {
    super();
  }

  // TODO: input the return JSON (compare with the expected processed JSON)
  public MockCampaignsServlet(String sessionId, String refreshToken) {
  	super();
  	this.sessionId = sessionId;
  	this.refreshToken = refreshToken;
  }

  @Override
	protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken, long loginCustomerId) {
    this.loginCustomerId = loginCustomerId;
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
  	// change to allow for flexible test cases (in constructor)
  	ArrayList<SearchGoogleAdsStreamResponse> lst = new ArrayList<>();
  	SearchGoogleAdsStreamResponse rsp = PowerMockito.mock(SearchGoogleAdsStreamResponse.class);
	   when (rsp.toString()).thenReturn("{results {campaign { resource_name\"adsf\"} id { value: 1010}}}");
 		lst.add(rsp);
 		return (Iterable<SearchGoogleAdsStreamResponse>) lst;
 	}

  // streamresponse is mocked, so how can we override the json printer stuff without truly overriding it?
  /*
  @Override
  protected String searchGoogleAdsStreamResponseToJSON(SearchGoogleAdsStreamResponse response) {
	 	String json = "{\"results\": [{ \"campaign\": {\"resourceName\": \"customers/4498877497/campaigns/10314647934\",";
   	json += "\"id\": \"10314647934\"}}, {\"campaign\": {\"resourceName\": ";
   	json += "\"customers/4498877497/campaigns/10371310206\",\"id\": \"10371310206\"}}],";
   	json += "\"fieldMask\": \"campaign.id\"}";
   	return json;
  }*/
  @Override
  public String processErrorJSON(String errorMessage, String errorCode) {
    // the method is protected in GetCampaignsServlet
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
}