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
import Query from './Queries';
import QueryAccount from './QueryAccount';
import { makeStyles } from '@material-ui/core/styles';

import { stylesSettings } from '../../Utilities/Styles';
import { QueryWalkthrough } from '../../Utilities/Walkthrough';
import Joyride, { STATUS } from 'react-joyride';
const Styles = makeStyles(stylesSettings);

class QueryPageLayout extends React.Component {
  constructor(props) {
    super(props);

    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.updateShouldRunTutorial = this.updateShouldRunTutorial.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);

    window.addEventListener('storage', () => {
      this.handleStorageChange();
    });

    this.state = {
      shouldRunTutorial: this.updateShouldRunTutorial(),
    };
  }

  updateShouldRunTutorial() {
    return localStorage.getItem('runTutorial') == null
      ? true
      : localStorage.getItem('runTutorial') === 'true';
  }

  handleStorageChange() {
    this.setState({ shouldRunTutorial: this.updateShouldRunTutorial() });
  }

  handleJoyrideCallback(data) {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our state and the localStorage state to false, so we can restart if we click start again.
      localStorage.setItem('runTutorial', false);
      this.setState({ shouldRunTutorial: false });
    }
  }
  render() {
    return (
      <React.Fragment>
        <Joyride
          steps={QueryWalkthrough}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          run={this.state.shouldRunTutorial}
          callback={this.handleJoyrideCallback}
        />
        <ComponentLayout />
      </React.Fragment>
    );
  }
}

const ComponentLayout = (props) => {
  const classes = Styles();
  return (
    <Grid container spacing={3}>
      {/* Selected Account */}
      <Grid item xs={12}>
        <Paper className={classes.paper + ' selected-account'}>
          <QueryAccount />
        </Paper>
      </Grid>
      {/* Query Card */}
      <Grid item xs={12}>
        <Paper className={classes.paper + ' query-card'}>
          <Query />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QueryPageLayout;
