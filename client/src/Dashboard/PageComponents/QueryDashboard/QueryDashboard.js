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
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Query from './Queries';
import QueryAccount from './QueryAccount';
import { makeStyles } from '@material-ui/core/styles';

import { stylesSettings } from '../../Utilities/Styles';
import Joyride from 'react-joyride';
const Styles = makeStyles(stylesSettings);

export default function Queries(props) {
  const steps = [
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
  const classes = Styles();
  return (
    <React.Fragment>
    <Joyride 
      steps={steps}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      run={props.runTutorial}
      callback={props.handleJoyrideCallback}
    />
      <Grid container spacing={3}>
        {/* Selected Account */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " selected-account"}>
            <QueryAccount />
          </Paper>
        </Grid>
        {/* Query Card */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " query-card"}>
            <Query />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
