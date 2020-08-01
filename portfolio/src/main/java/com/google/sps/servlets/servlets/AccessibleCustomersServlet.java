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
import java.io.FileNotFoundException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.ads.googleads.lib.GoogleAdsClient;
import com.google.ads.googleads.v3.errors.GoogleAdsError;
import com.google.ads.googleads.v3.errors.GoogleAdsException;

import com.google.ads.googleads.v3.services.GoogleAdsRow;
import com.google.ads.googleads.v3.services.CustomerServiceClient;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient;
import com.google.ads.googleads.v3.services.GoogleAdsServiceClient.SearchPagedResponse;
import com.google.ads.googleads.v3.services.ListAccessibleCustomersRequest;
import com.google.ads.googleads.v3.services.ListAccessibleCustomersResponse;
import com.google.ads.googleads.v3.services.SearchGoogleAdsRequest;

import com.google.common.base.Strings;
import com.google.ads.googleads.v3.resources.Customer;
import com.google.ads.googleads.v3.resources.CustomerClient;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import com.google.ads.googleads.v3.utils.ResourceNames;
import com.google.auth.Credentials;

import com.google.sps.data.DatastoreRetrieval;
import com.google.sps.data.CredentialRetrieval;

import com.google.protobuf.util.JsonFormat;
import org.json.JSONObject;
import org.json.JSONArray;

import com.google.sps.utils.Constants;


/** Gets all campaigns. To add campaigns, run AddCampaigns.java. */
@WebServlet("/customer")
public class AccessibleCustomersServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    
    GoogleAdsClient googleAdsClient;
    response.setContentType("application/json;");
    String sessionId = (String) request.getSession().getId();

    //remove previously set client account
    DatastoreRetrieval.removeEntityFromDatastore("LoginId", sessionId);
    DatastoreRetrieval.removeEntityFromDatastore("CustomerId", sessionId);
    DatastoreRetrieval.removeEntityFromDatastore("AccountName", sessionId);

    String customerJSON = "";

    try {
      googleAdsClient = buildGoogleAdsClient(CredentialRetrieval.getCredentials(sessionId), 
        DatastoreRetrieval.getEntityFromDatastore(Constants.SETTINGS, Constants.DEVELOPER_TOKEN));
    }  catch (Exception ioe) {
      System.err.printf("Failed to create GoogleAdsClient. Exception: %s%n", ioe);
      writeServletResponse(response, processErrorJSON(ioe.toString(), "503"));
      return;
    }

    try {
      customerJSON = new AccessibleCustomersServlet().runExample(googleAdsClient, sessionId);
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
        customerJSON += googleAdsError.toString() + "\n";
      }
    }
    response.getWriter().println(customerJSON);
  }

  /**
   * Runs the example.
   *
   * @param client the GoogleAdsClient instance to use.
   */
  private String runExample(GoogleAdsClient client, String sessionId) {
    JSONObject returnObject = new JSONObject();
    JSONObject metaObject = new JSONObject();
    JSONArray customerArray = new JSONArray();

    try (CustomerServiceClient customerService = createCustomerServiceClient(client)) {
      ListAccessibleCustomersResponse response = listAccessibleCustomers(customerService);
      System.out.printf("Total results: %d%n", response.getResourceNamesCount());

      for (String customerResourceName : response.getResourceNamesList()) {
        System.out.printf("Customer resource name: %s%n", customerResourceName);
        Customer customer = customerService.getCustomer(customerResourceName);
        String customerId = Long.toString(customer.getId().getValue());

        ArrayList<CustomerClient> children = new ArrayList<>();
        
        try {
          children =  createCustomerClientToHierarchy(customerId, customerId, sessionId);
        }
        catch (IOException ioe) {
          System.err.printf("Request failed. Exception: %s%n", ioe);
        }
        //API cannot build account hierarchy on test accounts (simply return root)
        if (children == null || children.toString().equals("[]")) {
          JSONObject customerObject = new JSONObject();
          customerObject.put("id", customerId);
          customerObject.put("child", customerId);
          customerObject.put("name", customer.getDescriptiveName().getValue());
          customerArray.put(customerObject);
        } else {
            //build out customerObject per child
            for (CustomerClient child : children) {
              JSONObject customerObject = new JSONObject();
              customerObject.put("id", customerId);
              customerObject.put("child", child.getId().getValue());
              customerObject.put("name", child.getDescriptiveName().getValue());
              customerArray.put(customerObject);
            }
        }
      }
      metaObject.put("status", "200");
      returnObject.put("response", customerArray);
      returnObject.put("meta", metaObject);
      System.out.println(returnObject.toString());
      return returnObject.toString();
    }
  }

  /**
   * Creates a map between a CustomerClient and each of its managers' mappings.
   *
   * @param loginCustomerId the loginCustomerId used to create the GoogleAdsClient.
   * @param seedCustomerId the ID of the customer at the root of the tree.
   * @return a map between a CustomerClient and each of its managers' mappings if the account
   *     hierarchy can be retrieved. If the account hierarchy cannot be retrieved, returns null.
   * @throws IOException if a Google Ads Client is not successfully created.
   */
  protected ArrayList<CustomerClient> createCustomerClientToHierarchy(
      String loginCustomerIdStr, String seedCustomerIdStr, String sessionId) throws IOException {
    
    Long seedCustomerId = Long.parseLong(seedCustomerIdStr);
    Long loginCustomerId = Long.parseLong(loginCustomerIdStr);

    ArrayList<CustomerClient> accountHierarchies = new ArrayList<>();

    Queue<Long> managerAccountsToSearch = new LinkedList<>();
    CustomerClient rootCustomerClient = null;

    // Creates a GoogleAdsClient with the specified loginCustomerId. See
    // https://developers.google.com/google-ads/api/docs/concepts/call-structure#cid for more
    // information.
    GoogleAdsClient googleAdsClient =
        GoogleAdsClient.newBuilder().setCredentials(CredentialRetrieval.getCredentials(sessionId))
        .setDeveloperToken(DatastoreRetrieval.getEntityFromDatastore("Settings", "DEVELOPER_TOKEN"))
        .setLoginCustomerId(loginCustomerId == null ? seedCustomerId : loginCustomerId).build();

    // Creates the Google Ads Service client.
    try (GoogleAdsServiceClient googleAdsServiceClient =
        googleAdsClient.getLatestVersion().createGoogleAdsServiceClient()) {
      // Creates a query that retrieves all child accounts of the manager specified in search
      // calls below.
      String query =
          "SELECT customer_client.client_customer, customer_client.level, "
              + "customer_client.manager, customer_client.descriptive_name, "
              + "customer_client.currency_code, customer_client.time_zone, "
              + "customer_client.id "
              + "FROM customer_client "
              + "WHERE customer_client.level <= 1";

      // Adds the seed customer ID to the list of IDs to be processed.
      managerAccountsToSearch.add(seedCustomerId);
      // Performs a breadth-first search algorithm to build a mapping of managers to their
      // child accounts.
      Multimap<Long, CustomerClient> customerIdsToChildAccounts = ArrayListMultimap.create();
      while (!managerAccountsToSearch.isEmpty()) {
        //get first ID from queue
        long customerIdToSearchFrom = managerAccountsToSearch.poll();
        SearchPagedResponse response;
        try {
          // Issues a search request.
          response =
              googleAdsServiceClient.search(
                  SearchGoogleAdsRequest.newBuilder()
                      .setQuery(query)
                      .setCustomerId(Long.toString(customerIdToSearchFrom))
                      .build());

          // Iterates over all rows in all pages to get all customer clients under the specified
          // customer's hierarchy.
          for (GoogleAdsRow googleAdsRow : response.iterateAll()) {
            CustomerClient customerClient = googleAdsRow.getCustomerClient();

            // Gets the CustomerClient object for the root customer in the tree.
            if (customerClient.getId().getValue() == seedCustomerId) {
              rootCustomerClient = customerClient;
            }

            // The steps below map parent and children accounts. Continue here so that managers
            // accounts exclude themselves from the list of their children accounts.
            if (customerClient.getId().getValue() == customerIdToSearchFrom) {
              continue;
            }

            // For all level-1 (direct child) accounts that are manager accounts, the above
            // query will be run against them to create a map of managers to their
            // child accounts for printing the hierarchy afterwards.
            customerIdsToChildAccounts.put(customerIdToSearchFrom, customerClient);
            // Checks if the child account is a manager itself so that it can later be processed
            // and added to the map if it hasn't been already.
            if (customerClient.getManager().getValue()) {
              // A customer can be managed by multiple managers, so to prevent visiting the same
              // customer multiple times, we need to check if it's already in the map.
              boolean alreadyVisited =
                  customerIdsToChildAccounts.containsKey(customerClient.getId().getValue());
              if (!alreadyVisited && customerClient.getLevel().getValue() == 1) {
                //investigate level-1 child as a manager account during the next iteration
                managerAccountsToSearch.add(customerClient.getId().getValue());
              }
            }
          }
        } catch (GoogleAdsException gae) {
          System.out.printf(
              "Unable to retrieve hierarchy for customer ID %d: %s%n",
              customerIdToSearchFrom, gae.getGoogleAdsFailure().getErrors(0).getMessage());
        }
      }

      // The rootCustomerClient will be null if the account hierarchy was unable to be retrieved
      // (e.g. the account is a test account or a client account with an incomplete billing setup.
      // This method returns null in these cases to add the seedCustomerId to the list of
      // customer IDs for which the account hierarchy could not be retrieved.
      if (rootCustomerClient == null) {
        // Prints the IDs of any accounts that did not produce hierarchy information.
        System.out.print(
        "Unable to retrieve information for the following account which is likely either a test "
            + "account or account with setup issues. Please check the logs for details:  ");
        System.out.println(seedCustomerId);
        return null;
      }

      int depth = 0;
      // Prints the hierarchy information for all accounts for which there is hierarchy information
      // available.
      System.out.printf("Hierarchy of customer ID %d:%n", rootCustomerClient.getId().getValue());
      buildAccountHierarchy(rootCustomerClient, customerIdsToChildAccounts, depth, accountHierarchies);

      return accountHierarchies;
    }
  }

  /**
   * Recursively builds the specified account's hierarchy.
   *
   * @param customerClient the customer client whose info will be printed and its child accounts
   *     will be processed if it's a manager.
   * @param customerIdsToChildAccounts a map containing the account hierarchy information.
   * @param depth the current depth we are printing from in the account hierarchy.
   */
  protected void buildAccountHierarchy(
      CustomerClient customerClient,
      Multimap<Long, CustomerClient> customerIdsToChildAccounts,
      int depth, ArrayList<CustomerClient> accountHierarchies) {
    
    long customerId = customerClient.getId().getValue();

    //Print hierarchy to terminal for debugging

    // String leadingSpace = " ";
    // if (depth == 0) {
    //   System.out.println("Customer ID (Descriptive Name, Currency Code, Time Zone");
    //   leadingSpace = "";
    // } else {
    //   System.out.println("|");
    // }
    // System.out.print(Strings.repeat("-", depth * 2));
    // System.out.printf(
    //     leadingSpace + "%d ('%s', '%s', '%s')%n",
    //     customerId,
    //     customerClient.getDescriptiveName().getValue(),
    //     customerClient.getCurrencyCode().getValue(),
    //     customerClient.getTimeZone().getValue()
    //     );
    
    //do not put rootCustomerClient as its own child
    if (depth != 0) {
      accountHierarchies.add(customerClient);
    }

    //Recursive call to any child accounts (Depth First Search)
    for (CustomerClient childCustomer : customerIdsToChildAccounts.get(customerId)) {
      buildAccountHierarchy(childCustomer, customerIdsToChildAccounts, depth + 1, accountHierarchies);
    }
  } 

  protected String processErrorJSON(String errorMessage, String errorCode) {
    JSONObject metaObj = new JSONObject();
    metaObj.put("message", errorMessage);
    metaObj.put("status", errorCode);
    JSONObject returnObj = new JSONObject();
    returnObj.put("meta", metaObj);
    return returnObj.toString();
  }

  private void writeServletResponse(HttpServletResponse response, String messageJSON) {
    response.setContentType("application/json");
    try {
      response.getWriter().println(messageJSON);
    } catch (Exception e) {
      System.err.println(e);
    }
  }

  protected GoogleAdsClient buildGoogleAdsClient(Credentials c, String developerToken) {
    return GoogleAdsClient.newBuilder().setCredentials(c).setDeveloperToken(developerToken).build();
  }

  protected ListAccessibleCustomersResponse listAccessibleCustomers(CustomerServiceClient c) {
    return c.listAccessibleCustomers(ListAccessibleCustomersRequest.newBuilder().build());
  }

  protected CustomerServiceClient createCustomerServiceClient(GoogleAdsClient client) {
    return client.getLatestVersion().createCustomerServiceClient();
  }
}