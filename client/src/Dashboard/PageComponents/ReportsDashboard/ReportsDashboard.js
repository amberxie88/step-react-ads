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
import SentimentGraph from './Reports/SentimentGraph';
import ClicksPerCampaignChart from './Reports/ClicksPerCampaignChart';
import Deposits from './Reports/Deposits';
import CampaignData from './Reports/CampaignData';
import { makeStyles } from '@material-ui/core/styles';
import Joyride from 'react-joyride';

import { stylesSettings } from '../../Utilities/Styles';
import { ReportsWalkthrough } from '../../Utilities/Walkthrough';
const Styles = makeStyles(stylesSettings);

export default function Reports(props) {
  const classes = Styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Joyride 
        steps = {ReportsWalkthrough}
        continuous = {true}
        showProgress = {true}
        showSkipButton = {true}
        run={props.runTutorial}
        callback={props.handleJoyrideCallback}
      />
      <Grid container spacing={3}>
        {/* ClicksPerCampaignChart */}
        <Grid item xs={12} md={9} xl={9}>
          <Paper className={fixedHeightPaper + " clicks-per-campaign"}>
            <ClicksPerCampaignChart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={3} xl={3}>
          <Paper className={fixedHeightPaper + " recent-deposits"}>
            <Deposits />
          </Paper>
        </Grid>
        {/* API-integrated Graph */}
        <Grid item xs={12} md={12} xl={6}>
          <Paper className={fixedHeightPaper + " chart-api"}>
            <SentimentGraph />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={12} xl={6}>
          <Paper className={fixedHeightPaper + " chart-1"}>
            <Chart />
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
