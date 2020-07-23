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

import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;

import io.grpc.StatusRuntimeException;
import com.google.api.gax.rpc.InvalidArgumentException;
import com.google.api.gax.rpc.PermissionDeniedException;


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/campaign")
public class GetCampaignsServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // GET QUERY STRING
    String query = request.getParameter("query");
    String sessionId = (String) request.getSession().getId();

    //params.customerId = Long.parseLong("4498877497"); //Amber

    String customerId = DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId);
    String loginId = DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId);

    String returnJSON = "";
    try {
      returnJSON = runExample(Long.parseLong(loginId), Long.parseLong(customerId), query, sessionId);
      returnJSON = processJSON(returnJSON);
      //System.out.println("returnJSON = " + returnJSON);
    } catch (GoogleAdsException gae) {
      // GoogleAdsException is the base class for most exceptions thrown by an API request.
      // Instances of this exception have a message and a GoogleAdsFailure that contains a
      // collection of GoogleAdsErrors that indicate the underlying causes of the
      // GoogleAdsException.
      String errorString = "";
      for (GoogleAdsError googleAdsError : gae.getGoogleAdsFailure().getErrorsList()) {
        errorString += googleAdsError.toString() + ". ";
      }
      writeServletResponse(response, processErrorJSON(errorString, "500"));
      return;
    } catch (Exception e) {
      System.err.println(e);
      writeServletResponse(response, processErrorJSON(e.getMessage(), "500"));
    }
    writeServletResponse(response, returnJSON);
    return;
  }

   /**
   * Runs the example.
   *
   * @param googleAdsClient the Google Ads API client.
   * @param customerId the client customer ID.
   * @throws GoogleAdsException if an API request failed with one or more service errors.
   */

  private String runExample(long loginId, long customerId, String query, String sessionId) {
    String returnJSON = "";
    System.out.println(query);
    System.out.println(customerId);
    GoogleAdsClient googleAdsClient;

    try {
      googleAdsClient = buildGoogleAdsClient(CredentialRetrieval.getCredentials(sessionId), 
        DatastoreRetrieval.getEntityFromDatastore("Settings", "DEVELOPER_TOKEN"), loginId);
    } catch (Exception e) {
      return processErrorJSON(e.toString(), "503");
    }
    try (GoogleAdsServiceClient googleAdsServiceClient =
        createGoogleAdsServiceClient(googleAdsClient)) {
      SearchGoogleAdsStreamRequest request = buildSearchGoogleAdsStreamRequest(query, customerId);
      // Creates and issues a search Google Ads stream request that will retrieve query results.
      Iterable<SearchGoogleAdsStreamResponse> stream = issueSearchGoogleAdsStreamRequest(googleAdsServiceClient, request);

      for (SearchGoogleAdsStreamResponse response : stream) {
        returnJSON += searchGoogleAdsStreamResponseToJSON(response);
      }
    } catch (InvalidArgumentException e) {
      return processErrorJSON(e.toString(), "400");
    } catch (PermissionDeniedException e) {
      return processErrorJSON(e.getMessage(), "403");
    } catch (Exception e) {
      return processErrorJSON(e.toString(), "500"); // 500
    }
    System.out.println(returnJSON);
    return returnJSON;
  }

  protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken, long loginCustomerId) {
    return GoogleAdsClient.newBuilder().setCredentials(c).setDeveloperToken(developerToken)
      .setLoginCustomerId(loginCustomerId).build();
  }

  protected GoogleAdsServiceClient createGoogleAdsServiceClient(GoogleAdsClient googleAdsClient) {
    return googleAdsClient.getLatestVersion().createGoogleAdsServiceClient();
  }

  protected Iterable<SearchGoogleAdsStreamResponse> issueSearchGoogleAdsStreamRequest(GoogleAdsServiceClient googleAdsServiceClient, SearchGoogleAdsStreamRequest request) {
    return googleAdsServiceClient.searchStreamCallable().call(request);
  }

  protected SearchGoogleAdsStreamRequest buildSearchGoogleAdsStreamRequest(String query, long customerId) {
    // Constructs the SearchGoogleAdsStreamRequest.
    SearchGoogleAdsStreamRequest request =
        SearchGoogleAdsStreamRequest.newBuilder()
            .setCustomerId(Long.toString(customerId))
            .setQuery(query)
            .build();
    return request;
  }

  protected String searchGoogleAdsStreamResponseToJSON(SearchGoogleAdsStreamResponse response) {
    try {
      String returnJSON = JsonFormat.printer().print(response);
      return returnJSON;
    } catch (Exception e) {
      System.err.println(e);
      return "";
    }
  }

  protected String processJSON(String jsonString) {
    JSONObject jsonObject = new JSONObject(jsonString);

    if (jsonObject.has("meta") && !jsonObject.getJSONObject("meta").get("status").equals("200")) {
      return jsonString;
    }

    if (!jsonObject.has("results")) {
      return processErrorJSON ("Unknown error", "500");
    }

    JSONArray resultsComplete = jsonObject.getJSONArray("results");
    String fieldMaskStr = (String) jsonObject.get("fieldMask");
    String[] fieldMaskArr = fieldMaskStr.split(",");
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

    JSONObject metaObj = processMetaJSON(invalidRequestValues);

    JSONObject finalJSON = new JSONObject();
    finalJSON.put("response", returnArray);
    finalJSON.put("meta", metaObj);
    finalJSON.put("fieldmask", fieldMaskArr);
    return finalJSON.toString();
  }

  protected String processErrorJSON(String errorMessage, String errorCode) {
    JSONObject metaObj = new JSONObject();

    metaObj.put("message", errorMessage);
    metaObj.put("status", errorCode);

    JSONObject returnObj = new JSONObject();
    returnObj.put("meta", metaObj);
    return returnObj.toString();
  }

  /**
   * Returns error message in meta JSON if there are invalid requests.
  */
  protected JSONObject processMetaJSON(Set<String> invalidRequestValuesSet) {
    JSONObject metaObj = new JSONObject();
    if (invalidRequestValuesSet.size() == 0) {
      metaObj.put("status", "200");
      return metaObj;
    }

    String errorMessage = "Values not found: ";
    for (String requestValue: invalidRequestValuesSet) {
      errorMessage = errorMessage + requestValue + " ";
    }
    metaObj.put("message", errorMessage);
    metaObj.put("status", "400");
    return metaObj;
  }

  protected String getValueFromJSON(JSONObject obj, String requestedValue) {
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

  protected void writeServletResponse(HttpServletResponse response, String messageJSON) {
    response.setContentType("application/json");
    try {
      response.getWriter().println(messageJSON);
    } catch (Exception e) {
      System.err.println(e);
    }
  }
}
