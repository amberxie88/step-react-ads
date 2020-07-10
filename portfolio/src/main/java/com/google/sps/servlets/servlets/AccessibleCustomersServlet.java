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
import java.io.FileNotFoundException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.errors.GoogleAdsError;
import com.google.ads.googleads.v3.errors.GoogleAdsException;
import com.google.ads.googleads.v3.services.CustomerServiceClient;
import com.google.ads.googleads.v3.services.ListAccessibleCustomersRequest;
import com.google.ads.googleads.v3.services.ListAccessibleCustomersResponse;
import java.io.FileNotFoundException;
import java.io.IOException;

import com.google.ads.googleads.v3.resources.Customer;
import com.google.ads.googleads.v3.services.CustomerServiceClient;
import com.google.ads.googleads.v3.utils.ResourceNames;

import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;

import com.google.protobuf.util.JsonFormat;
import org.json.JSONObject;
import org.json.JSONArray;


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/customer")
public class AccessibleCustomersServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    GoogleAdsClient googleAdsClient;
    try {
      googleAdsClient = GoogleAdsClient.newBuilder().setCredentials(CredentialRetrieval.getCredentials())
        .setDeveloperToken(DatastoreRetrieval.getCredentialFromDatastore("DEVELOPER_TOKEN")).build();
    }  catch (Exception ioe) {
      System.err.printf("Failed to create GoogleAdsClient. Exception: %s%n", ioe);
      return;
    }

    String customerJSON = "";
    try {
      customerJSON = new AccessibleCustomersServlet().runExample(googleAdsClient);
      
    } catch (GoogleAdsException gae) {
      // GoogleAdsException is the base class for most exceptions thrown by an API request.
      // Instances of this exception have a message and a GoogleAdsFailure that contains a
      // collection of GoogleAdsErrors that indicate the underlying causes of the
      // GoogleAdsException.
      response.getWriter().println(customerJSON);
      response.setContentType("application/json;");
      System.err.printf(
          "Request ID %s failed due to GoogleAdsException. Underlying errors:%n",
          gae.getRequestId());
      int i = 0;
      for (GoogleAdsError googleAdsError : gae.getGoogleAdsFailure().getErrorsList()) {
        System.err.printf("  Error %d: %s%n", i++, googleAdsError);
      }
    }
    response.getWriter().println(customerJSON);
    response.setContentType("application/json;");
  }

  /**
   * Runs the example.
   *
   * @param client the GoogleAdsClient instance to use.
   */
  private String runExample(GoogleAdsClient client) {
    JSONObject returnObject = new JSONObject();
    JSONArray customerArray = new JSONArray();

    try (CustomerServiceClient customerService =
        client.getLatestVersion().createCustomerServiceClient()) {
      ListAccessibleCustomersResponse response =
          customerService.listAccessibleCustomers(
              ListAccessibleCustomersRequest.newBuilder().build());
      System.out.printf("Total results: %d%n", response.getResourceNamesCount());

      for (String customerResourceName : response.getResourceNamesList()) {
        System.out.printf("Customer resource name: %s%n", customerResourceName);
        JSONObject customerObject = new JSONObject();
        String customerId = customerResourceName.substring(10);
        customerObject.put("id", customerId);
        customerObject.put("name", getName(client, Long.parseLong(customerId)));
        customerArray.put(customerObject);
      }
      returnObject.put("response", customerArray);
      return returnObject.toString();
    }
  }

  

  private String getName(GoogleAdsClient googleAdsClient, long customerId) {
    try (CustomerServiceClient customerServiceClient =
        googleAdsClient.getLatestVersion().createCustomerServiceClient()) {
      String customerResourceName = ResourceNames.customer(customerId);
      Customer customer = customerServiceClient.getCustomer(customerResourceName);
      // Prints account information. Descriptive Name is useful.
      //eg Customer with ID 9797005693, descriptive name 'AX Test', currency code 'USD', timezone 'America/Los_Angeles', tracking URL template '' and auto tagging enabled 'false' was retrieved.
      System.out.printf(
          "Customer with ID %d, descriptive name '%s', currency code '%s', timezone '%s', "
              + "tracking URL template '%s' and auto tagging enabled '%s' was retrieved.%n",
          customer.getId().getValue(),
          customer.getDescriptiveName().getValue(),
          customer.getCurrencyCode().getValue(),
          customer.getTimeZone().getValue(),
          customer.getTrackingUrlTemplate().getValue(),
          customer.getAutoTaggingEnabled().getValue());
      return customer.getDescriptiveName().getValue();
    }
  }
}
