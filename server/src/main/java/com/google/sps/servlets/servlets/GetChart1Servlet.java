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
@WebServlet("/chart-api")
public class GetChart1Servlet extends GetCampaignsServlet {

  private final static String finalQuery = "SELECT ad_group_ad.ad.expanded_text_ad.headline_part1, "
    + "ad_group_ad.ad.expanded_text_ad.headline_part2, metrics.clicks FROM ad_group_ad WHERE ad_group_ad.ad.type = EXPANDED_TEXT_AD LIMIT 100";

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
      returnJSON = addSentimentAnalysis(returnJSON);
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
      super.writeServletResponse(response, processErrorJSON(e.getMessage(), Constants.ERROR_500));
    }
    super.writeServletResponse(response, returnJSON);
    return;
  }

  protected String addSentimentAnalysis(String jsonString) {
    JSONObject jsonObject = new JSONObject(jsonString);

    if (jsonObject.has("meta") && jsonObject.getJSONObject("meta").has("status") && !jsonObject.getJSONObject("meta").get("status").equals("200")) {
      return jsonString;
    }
    JSONArray results = jsonObject.getJSONArray("response");
    for (int i = 0; i < results.length(); i++) {
      JSONObject objInUse = (JSONObject) results.get(i);
      String headline_part1 = objInUse.get("adGroupAd.ad.expandedTextAd.headlinePart1").toString();
      String headline_part2 = objInUse.get("adGroupAd.ad.expandedTextAd.headlinePart2").toString();
      String headline = headline_part1 + " " + headline_part2;
      String sentiment = getSentimentValue(headline);
      objInUse.put("sentiment", sentiment);
      objInUse.put("headline", headline);
      objInUse.remove("adGroupAd.ad.expandedTextAd.headlinePart1");
      objInUse.remove("adGroupAd.ad.expandedTextAd.headlinePart2");
    }
    return jsonObject.toString();
  }

  private String getSentimentValue(String input) {
    Document doc;
    LanguageServiceClient languageService;
    try {
      doc = Document.newBuilder().setContent(input).setType(Document.Type.PLAIN_TEXT).build();      
      languageService = LanguageServiceClient.create();
    } catch (Exception e) {
      return "";
    }

    Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
    float score = sentiment.getScore();
    languageService.close();
    return String.valueOf(score);
  }
}