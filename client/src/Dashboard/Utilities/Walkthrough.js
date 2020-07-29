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
import React from 'react';

const QueryWalkthrough = [
  {
    target: 'body',
    content: 
      <div>
        <h1>Welcome to the Query Page!</h1> 
        <p>This page is a sample of how the Ads API can be used to obtain information about an account.
          The queries follow the Google Ads Query Language 
          (<a href="https://developers.google.com/google-ads/api/docs/query/interactive-gaql-builder">GAQL</a>),
          which is then processed by the servlet. The code primarily lies in QueryDashboard.js and GetCampaignsServlet.java
        </p>
      </div>,
    placement: 'center',
  }, {
    target: '.selected-account',
    content:
     <div>
        <h2>Select Your Client Account</h2> 
        <p>After authenticating on the Login page, the user is prompted to select a client account to query.
          Under every Google Ads account, there can be multiple manager accounts, which may manage separate clients or other
          managers. To learn more about how we keep track of client accounts of different sessions, revisit our login page!
        </p>
      </div>,
  }, {
    target: '.query-card',
    content:        
      <div>
        <h2>Query Card</h2> 
        <p>Here, the user may enter any query that follows the GAQL syntax, and the results will be generated
          below. Users will be notified if any error occurs during the Ads API call. To build your own GAQL queries
          or learn more about the GAQL syntax, visit <a href="https://developers.google.com/google-ads/api/docs/query/interactive-gaql-builder">this link</a>.
        </p>
      </div>,
  }];

const LoginWalkthrough = [
  {
    target: 'body',
    content: 
      <div>
        <h1>Welcome to the Google Ads API Web App Demo!</h1> 
        <p>
          Throughout the website, we will have a series of tours showing how we implemented the Ads API into 
          a simple web application, and how you can do so as well! Intermediate developers have historically 
          struggled with integrating the API, especially in regards to the OAuth 2.0 web flow, and we hope 
          this will serve as a starter project or example of how the Ads API can be used. Check out 
          our <a href="https://github.com/amberxie88/step-react-ads">Github page</a>.
        </p>
      </div>,
    placement: 'center',
  }, {
    target: 'body',
    content: 
      <div>
        <h1>This is the Login Page</h1> 
        <p> 
          This Login Page implements the OAuth 2.0 procedure, a historically challenging task for Intermediate
          developers. To implement this, we rely on two main servlets: OAuthServlet.java and CallbackServlet.java, 
          and we use Datastore to maintain credentials and refresh tokens for each session. 
        </p>
      </div>,
    placement: 'center',
  }, {
    target: '.login-button',
    content:
     <div>
        <h2>Login Button</h2> 
        <p>
          This Login Button makes a call to the OAuth servlet, which retrieves the necessary credentials, the
          redirect URI, and the current HTTP Session to generate a unique URL for login. After the user logs in,
          they are redirected to the redirect URI, which is the Callback Servlet. The servlet verifies that it is
          retrieving the correct token for the session, generates the refresh token, and stores it in Datastore.
          It is important to note that each session is mapped to different refresh tokens.
        </p>
      </div>,
  }, {
    target: '.available-accounts',
    content:        
      <div>
        <h2>Available Customer IDs</h2> 
        <p>
          Once the user is logged in, the AccessibleCustomersServlet is called. This makes a call to the Ads API 
          and returns client accounts that the user has access to. The user may choose one, and the SetClientAccServlet
          is called, which maps the session ID to the selected customer ID, and uploads it to Datastore.
        </p>
      </div>,
  }, {
    target: '.logout-button',
    content:        
      <div>
        <h2>Logout Button</h2> 
        <p>
          At any point, if the user chooses to log in, their refresh token will be removed from Datastore via the
          LogoutServlet.
        </p>
      </div>,
  }];

const ReportsWalkthrough = [
  {
    target: 'body',
    content: 
      <div>
        <h1>Welcome to the Dashboard Page!</h1> 
        <p>This page is a sample of how the Ads UI can be replicated and customized using
          custom calls and charts. The code primarily lies in ReportsDashboard.js and 
          GetCampaignsServlet.java</p>
      </div>,
    placement: 'center',
  }, {
    target: '.clicks-per-campaign',
    content:
     <div>
        <h2>Clicks Per Campaign Chart</h2> 
        <p>This chart uses API data from your Ads Account to visualize how well campaigns are doing.
          This is an example of a chart that can be directly replicated from the Google Ads UI.</p>
      </div>,
  }, {
    target: '.chart-1',
    content:        
      <div>
        <h2>Sales Chart</h2> 
        <p>TODO: Details on how this is used.</p>
      </div>,
  }, {
    target: '.recent-deposits',
    content: 
      <div>
        <h2>Total Ad Spend</h2> 
        <p>TODO: Details on how this is used.</p>
      </div>,
  }, {
    target: '.campaign-data',
    content: 
      <div>
        <h2>Campaign Data</h2> 
        <p>This list of campaign IDs, names, status, clicks, and impressions is generated from a call
          to the Ads API.</p>
      </div>,
  },];
export { QueryWalkthrough, LoginWalkthrough, ReportsWalkthrough };
