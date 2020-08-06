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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.services.CampaignServiceClient;
import com.google.ads.googleads.examples.utils.CodeSampleParams;
import com.google.ads.googleads.examples.utils.ArgumentNames;
import com.google.ads.googleads.v3.errors.GoogleAdsException;
import com.google.ads.googleads.v3.errors.GoogleAdsError;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamRequest;
import com.google.ads.googleads.v3.services.SearchGoogleAdsStreamResponse;
import com.google.api.gax.rpc.ServerStream;
import com.google.ads.googleads.v3.services.GoogleAdsRow;

import com.google.ads.googleads.v3.services.stub.GrpcGoogleAdsServiceStub;
import com.google.auth.oauth2.UserCredentials;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.auth.Credentials;
import com.google.api.client.auth.oauth2.Credential;


import com.google.common.collect.Lists;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.*;

import com.beust.jcommander.Parameter;

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


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/campaign")
public class GetCampaignsServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String query = request.getParameter("query");
    Boolean exportTable = Boolean.parseBoolean(request.getParameter("exportTable"));
    System.out.println("export table: " + exportTable);

    String sessionId = (String) request.getSession().getId();
    //String customerId = "4498877497";
    //String loginId = "9797005693";
    // test
    String customerId = DatastoreRetrieval.getEntityFromDatastore("CustomerId", sessionId);
    String loginId = DatastoreRetrieval.getEntityFromDatastore("LoginId", sessionId);
    System.out.println(customerId);
    System.out.println(loginId);
    System.out.println("login an  customer id");
    long customerIdLong;
    long loginIdLong;

    try {
      loginIdLong = Long.parseLong(loginId);
      customerIdLong = Long.parseLong(customerId);
    } catch (Exception e) {
      writeServletResponse(response, processErrorJSON("Null Login ID or Customer ID", Constants.ERROR_500));
      return;
    }

    String returnJSON = "";
    try {
      returnJSON = runExample(loginIdLong, customerIdLong, query, sessionId);
      returnJSON = processJSON(returnJSON);
      
      if (exportTable) {
        try {
          createSpreadsheet(sessionId, returnJSON);
        } catch (IOException e){
          System.err.print(e);
        }
      }

    } catch (GoogleAdsException gae) {
      // GoogleAdsException is the base class for most exceptions thrown by an API request.
      // Instances of this exception have a message and a GoogleAdsFailure that contains a
      // collection of GoogleAdsErrors that indicate the underlying causes of the
      // GoogleAdsException.
      String errorString = "";
      for (GoogleAdsError googleAdsError : gae.getGoogleAdsFailure().getErrorsList()) {
        errorString += googleAdsError.toString() + ". ";
      }
      writeServletResponse(response, processErrorJSON(errorString, Constants.ERROR_500));
      return;
    } catch (Exception e) {
      System.err.println(e);
      writeServletResponse(response, processErrorJSON(e.getMessage(), Constants.ERROR_500));
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

  protected String runExample(long loginId, long customerId, String query, String sessionId) {
    String returnJSON = "";
    GoogleAdsClient googleAdsClient;
    //System.out.println(query);

    try {
      googleAdsClient = buildGoogleAdsClient(CredentialRetrieval.getCredentials(sessionId), 
        DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.DEVELOPER_TOKEN), loginId);
    } catch (Exception e) {
      return processErrorJSON(e.toString(), Constants.ERROR_503);
    }
    try (GoogleAdsServiceClient googleAdsServiceClient =
        createGoogleAdsServiceClient(googleAdsClient)) {
      SearchGoogleAdsStreamRequest request = buildSearchGoogleAdsStreamRequest(query, customerId);
      Iterable<SearchGoogleAdsStreamResponse> stream = issueSearchGoogleAdsStreamRequest(googleAdsServiceClient, request);

      for (SearchGoogleAdsStreamResponse response : stream) {
        returnJSON += searchGoogleAdsStreamResponseToJSON(response);
      }
    } catch (InvalidArgumentException e) {
      return processErrorJSON(e.toString(), Constants.ERROR_400);
    } catch (PermissionDeniedException e) {
      return processErrorJSON(e.getMessage(), Constants.ERROR_403);
    } catch (Exception e) {
      return processErrorJSON(e.toString(), Constants.ERROR_500);
    }

    return returnJSON;
  }

  private void createSpreadsheet(String sessionId, String returnJSON) throws IOException {
    JSONObject jsonObject = new JSONObject(returnJSON);
    JSONArray responseArr = jsonObject.getJSONArray("response");
    JSONArray fieldMaskArr = jsonObject.getJSONArray("fieldmask");
    //for now, set title as the date time
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String title = now.format(formatter);;

    System.out.println(title);

    String CLIENT_ID = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_ID");
	  String CLIENT_SECRET = DatastoreRetrieval.getEntityFromDatastore("Settings", "CLIENT_SECRET");
    String refreshToken =  DatastoreRetrieval.getEntityFromDatastore("Refresh", sessionId);
    HttpTransport httpTransport =  null;
    JsonFactory jsonFactory = null;

    try {
      System.out.println("create networks");
      httpTransport = GoogleNetHttpTransport.newTrustedTransport();
      jsonFactory = JacksonFactory.getDefaultInstance();
    } catch (Exception e) {
      System.err.print(e);
    }

    System.out.println("create credential");
    Credential credential = new GoogleCredential.Builder()
                      .setJsonFactory(jsonFactory)
                      .setTransport(httpTransport)
                      .setClientSecrets(CLIENT_ID, CLIENT_SECRET).build();
    credential.setRefreshToken(refreshToken);

    Sheets service = new Sheets.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName("demoApp")
                .build();

    System.out.println("creating spreadsheet");
    Spreadsheet spreadsheet = new Spreadsheet()
        .setProperties(new SpreadsheetProperties()
                .setTitle(title));
    spreadsheet = service.spreadsheets().create(spreadsheet)
            .setFields("spreadsheetId")
            .execute();

    System.out.println("Spreadsheet ID: " + spreadsheet.getSpreadsheetId());
    String spreadsheetId = spreadsheet.getSpreadsheetId();

    List<List<Object>> values = new ArrayList<>();

    //push content to spreadsheet
    List<Object> header = new ArrayList<>();
    for (int k = 0; k < fieldMaskArr.length(); k++) {
        header.add(fieldMaskArr.get(k));
    }
    values.add(header);

    for (int i = 0; i < responseArr.length(); i++ ) {
      JSONObject responseRow = (JSONObject) responseArr.get(i);
      List<Object> sheetRow = new ArrayList<>();
      for (int j = 0; j < fieldMaskArr.length(); j++) {
        sheetRow.add(responseRow.get((String) fieldMaskArr.get(j)));
      }
      values.add(sheetRow);
      System.out.println(sheetRow);
    }

    ValueRange body = new ValueRange()
      .setValues(values);
    UpdateValuesResponse result = service.spreadsheets().values()
      .update(spreadsheetId, "A1", body)
      .setValueInputOption("RAW")
      .execute();
  }

  protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken, long loginCustomerId) throws Exception {
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
      System.out.println("to json");
      System.out.println(returnJSON);
      return returnJSON;
    } catch (Exception e) {
      System.err.println(e);
      return "";
    }
  }

  protected String processJSON(String jsonString) {
    JSONObject jsonObject = new JSONObject(jsonString);

    if (jsonObject.has("meta") && jsonObject.getJSONObject("meta").has("status") && !jsonObject.getJSONObject("meta").get("status").equals("200")) {
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

    JSONObject metaObj = processInvalidRequestsMetaJSON(invalidRequestValues);

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
  protected JSONObject processInvalidRequestsMetaJSON(Set<String> invalidRequestValuesSet) {
    JSONObject metaObj = new JSONObject();
    if (invalidRequestValuesSet.size() == 0) {
      metaObj.put("status", Constants.STATUS_200);
      return metaObj;
    }

    String errorMessage = "Values not found: ";
    for (String requestValue: invalidRequestValuesSet) {
      errorMessage = errorMessage + requestValue + " ";
    }
    metaObj.put("message", errorMessage);
    metaObj.put("status", Constants.ERROR_400);
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