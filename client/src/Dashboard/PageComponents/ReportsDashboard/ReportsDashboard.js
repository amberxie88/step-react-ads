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

import { stylesSettings } from '../../Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function Reports(props) {
  const classes = Styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* ClicksPerCampaignChart */}
        <Grid item xs={12} md={12} xl={5}>
          <Paper className={fixedHeightPaper}>
            <ClicksPerCampaignChart />
          </Paper>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} xl={5}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} xl={2}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* CampaignData */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <CampaignData />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
