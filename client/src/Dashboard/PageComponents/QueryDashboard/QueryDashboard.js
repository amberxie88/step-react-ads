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
const Styles = makeStyles(stylesSettings);

export default function Queries(props) {
  const classes = Styles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Selected Account */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <QueryAccount />
          </Paper>
        </Grid>
        {/* Query Card */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Query />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
