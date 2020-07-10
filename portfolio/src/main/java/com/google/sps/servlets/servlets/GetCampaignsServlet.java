// Copyright 2018 Google LLC
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


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/campaign")
public class GetCampaignsServlet extends HttpServlet {

  private static class GetCampaignsWithStatsParams extends CodeSampleParams {
    @Parameter(names = ArgumentNames.CUSTOMER_ID, required = true)
    private Long customerId;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String query = request.getParameter("query");
    System.out.println(query);
    // customer ID of interest
    GetCampaignsWithStatsParams params = new GetCampaignsWithStatsParams();
    //params.customerId = Long.parseLong("4498877497"); //Amber
    params.customerId = Long.parseLong("3827095360"); //Kaitlyn
    System.out.println(params.customerId);

    GoogleAdsClient googleAdsClient;
    File propertiesFile = new File("ads.properties");
    try {
      googleAdsClient = GoogleAdsClient.newBuilder()
        .fromPropertiesFile(propertiesFile).build();
      //long managerId = Long.parseLong("9797005693");
      //googleAdsClient = GoogleAdsClient.newBuilder().fromPropertiesFile(propertiesFile).setLoginCustomerId(managerId).build();
    } catch (FileNotFoundException fnfe) {
      System.err.printf(
          "Failed to load GoogleAdsClient configuration from file. Exception: %s%n", fnfe);
      return;
    } catch (IOException ioe) {
      System.err.printf("Failed to create GoogleAdsClient. Exception: %s%n", ioe);
      return;
    }

    System.out.println("googleadsclient");
    
    String returnJSON = "";
    try {
      returnJSON = new GetCampaignsServlet().runExample(googleAdsClient, params.customerId, query);
      returnJSON = processJSON(returnJSON);
    } catch (GoogleAdsException gae) {
      // GoogleAdsException is the base class for most exceptions thrown by an API request.
      // Instances of this exception have a message and a GoogleAdsFailure that contains a
      // collection of GoogleAdsErrors that indicate the underlying causes of the
      // GoogleAdsException.
      System.err.printf(
          "Request ID %s failed due to GoogleAdsException. Underlying errors:%n",
          gae.getRequestId());
      int i = 0;
      for (GoogleAdsError googleAdsError : gae.getGoogleAdsFailure().getErrorsList()) {
        System.err.printf("  Error %d: %s%n", i++, googleAdsError);
      }
    }
    response.setContentType("application/json");
    response.getWriter().println(returnJSON);
  }

   /**
   * Runs the example.
   *
   * @param googleAdsClient the Google Ads API client.
   * @param customerId the client customer ID.
   * @throws GoogleAdsException if an API request failed with one or more service errors.
   */
  private String runExample(GoogleAdsClient googleAdsClient, long customerId, String query) {
    System.out.println("runExample called");
    String returnJSON = "";
    try (GoogleAdsServiceClient googleAdsServiceClient =
        googleAdsClient.getLatestVersion().createGoogleAdsServiceClient()) {
      //String query = "SELECT campaign.id, campaign.name, ad_group.name, ad_group_criterion.keyword.text FROM keyword_view";
      // Constructs the SearchGoogleAdsStreamRequest.
      SearchGoogleAdsStreamRequest request =
          SearchGoogleAdsStreamRequest.newBuilder()
              .setCustomerId(Long.toString(customerId))
              .setQuery(query)
              .build();

      // Creates and issues a search Google Ads stream request that will retrieve all campaigns.
      ServerStream<SearchGoogleAdsStreamResponse> stream =
          googleAdsServiceClient.searchStreamCallable().call(request);

      // Iterates through and prints all of the results in the stream response.
      for (SearchGoogleAdsStreamResponse response : stream) {
        try {
          returnJSON += JsonFormat.printer().print(response); 
        } catch (Exception e) {
          System.err.println(e);
        }
      }
    }
    return returnJSON;
  }

  private String processJSON(String jsonString) {
    JSONObject jsonObject = new JSONObject(jsonString);
    JSONArray resultsComplete = jsonObject.getJSONArray("results");
    String fieldMaskStr = (String) jsonObject.get("fieldMask");
    String[] fieldMaskArr = fieldMaskStr.split(",");
    System.out.println(Arrays.toString(fieldMaskArr)); 
    Set<String> invalidRequestValues = new HashSet<String>();


    JSONArray returnArray = new JSONArray();
    for (int i = 0; i < resultsComplete.length(); i++) {
      JSONObject resultObj = new JSONObject();
      for (String requestedValue: fieldMaskArr) {
        try {
          String value = getValueFromJSON((JSONObject) resultsComplete.get(i), requestedValue);
          resultObj.put(requestedValue, value);
        } catch (Exception e) {
          invalidRequestValues.add(requestedValue);
        }
      }
      returnArray.put(resultObj);
    }

    System.out.println(Arrays.toString(invalidRequestValues.toArray()));
    System.out.println(jsonObject.get("fieldMask"));
    JSONObject metaObj = processMetaJSON(invalidRequestValues);

    JSONObject finalJSON = new JSONObject();
    finalJSON.put("response", returnArray);
    finalJSON.put("meta", metaObj);
    finalJSON.put("fieldmask", fieldMaskArr);

    System.out.println(finalJSON.toString());

    return finalJSON.toString();
  }

  private JSONObject processMetaJSON(Set<String> invalidRequestValuesSet) {
    JSONObject metaObj = new JSONObject();
    if (invalidRequestValuesSet.size() == 0) {
      metaObj.put("status", "200");
      return metaObj;
    }

    String errorMessage = "Values not found: ";
    for (String requestValue: invalidRequestValuesSet) {
      errorMessage = errorMessage + requestValue + " ";
    }
    //JSONArray invalidRequestValuesJSON = new JSONArray(invalidRequestValuesSet.toArray());
    metaObj.put("message", errorMessage);
    metaObj.put("status", "400");
    return metaObj;
  }

  private String getValueFromJSON(JSONObject obj, String requestedValue) {
    String returnValue = "";
    String[] path = requestedValue.split("\\.");
    JSONObject objInUse = obj;
    for (int i = 0; i < path.length - 1; i++) {
      String stepInPath = path[i];
      obj = (JSONObject) obj.get(stepInPath);
    }
    returnValue = obj.get(path[path.length-1]).toString();
    return returnValue;
  }
}
