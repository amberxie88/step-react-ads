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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from './Login';
import Logout from './Logout';
import { makeStyles } from '@material-ui/core/styles';
import Accounts from './Accounts';
import { stylesSettings } from '../../Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function LoginDash(props) {
  const classes = Styles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Login Button */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Login />
          </Paper>
        </Grid>
        {/* Available Accounts */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Accounts />
          </Paper>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Logout />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
