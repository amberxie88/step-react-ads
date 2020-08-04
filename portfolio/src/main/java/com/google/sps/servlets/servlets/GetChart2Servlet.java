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
package com.google.sps.servlets;

import java.io.IOException;
import java.io.File;
import java.io.FileNotFoundException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.services.CampaignServiceClient;
import com.google.ads.googleads.examples.utils.CodeSampleParams;
import com.google.ads.googleads.examples.utils.ArgumentNames;
import com.beust.jcommander.Parameter;
import com.google.ads.googleads.v3.errors.GoogleAdsException;
import com.google.ads.googleads.v3.errors.GoogleAdsError;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamResponse;
import com.google.api.gax.rpc.ServerStream;
import com.google.ads.googleads.v3.services.GoogleAdsRow;

import com.google.ads.googleads.v3.services.stub.GrpcGoogleAdsServiceStub;
import com.google.auth.oauth2.UserCredentials;
import com.google.auth.Credentials;

import com.google.protobuf.util.JsonFormat;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.json.JSONArray;
import java.util.*;

import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;

import io.grpc.StatusRuntimeException;
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.api.gax.rpc.PermissionDeniedException;

import com.google.sps.utils.Constants;

import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/chart-2")
public class GetChart2Servlet extends GetCampaignsServlet {

  //SELECT campaign.name, campaign.status, segments.device, metrics.impressions,        metrics.clicks, metrics.ctr FROM campaign WHERE segments.date DURING LAST_30_DAYS ORDER BY metrics.clicks DESC
  private final static String finalQuery = "SELECT campaign.name, metrics.impressions, metrics.clicks, segments.device FROM campaign"
    + " WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0"
    + " ORDER BY metrics.clicks ASC LIMIT 100";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String query = finalQuery;
    String sessionId = (String) request.getSession().getId();
    String customerId = DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId);
    String loginId = DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId);
    long customerIdLong;
    long loginIdLong;

    try {
      loginIdLong = Long.parseLong(loginId);
      customerIdLong = Long.parseLong(customerId);
    } catch (Exception e) {
      super.writeServletResponse(response, processErrorJSON("Null Login ID or Customer ID", Constants.ERROR_500));
      return;
    }

    String returnJSON = "";
    try {
      returnJSON = super.runExample(loginIdLong, customerIdLong, query, sessionId);
      returnJSON = super.processJSON(returnJSON);
    } catch (GoogleAdsException gae) {
      // GoogleAdsException is the base class for most exceptions thrown by an API request.
      // Instances of this exception have a message and a GoogleAdsFailure that contains a
      // collection of GoogleAdsErrors that indicate the underlying causes of the
      // GoogleAdsException.
      String errorString = "";
      for (GoogleAdsError googleAdsError : gae.getGoogleAdsFailure().getErrorsList()) {
        errorString += googleAdsError.toString() + ". ";
      }
      super.writeServletResponse(response, processErrorJSON(errorString, Constants.ERROR_500));
      return;
    } catch (Exception e) {
      System.err.println(e);
      super.writeServletResponse(response, processErrorJSON(e.getMessage(), Constants.ERROR_500));
    }
    super.writeServletResponse(response, returnJSON);
    return;
  }
}