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
import Chart from './Reports/Chart';
import ClicksPerCampaignChart from './Reports/ClicksPerCampaignChart';
import Deposits from './Reports/Deposits';
import CampaignData from './Reports/CampaignData';
import { makeStyles } from '@material-ui/core/styles';
import Joyride from 'react-joyride';

import { stylesSettings } from '../../Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function Reports(props) {
  const steps = [
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

  const classes = Styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Joyride steps = {steps}
        continuous = {true}
        showProgress = {true}
        showSkipButton = {true}/>
      <Grid container spacing={3}>
        {/* ClicksPerCampaignChart */}
        <Grid item xs={12} md={12} xl={5}>
          <Paper className={fixedHeightPaper + " clicks-per-campaign"}>
            <ClicksPerCampaignChart />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} xl={5}>
          <Paper className={fixedHeightPaper + " chart-1"}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} xl={2}>
          <Paper className={fixedHeightPaper + " recent-deposits"}>
            <Deposits />
          </Paper>
        </Grid>
        {/* CampaignData */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " campaign-data"}>
            <CampaignData />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
