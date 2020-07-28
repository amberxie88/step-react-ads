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
import Joyride from 'react-joyride';
const Styles = makeStyles(stylesSettings);

export default function LoginDash(props) {
  const classes = Styles();
    const steps = [
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
  return (
    <React.Fragment>
      <Joyride 
        steps = {steps}
        continuous = {true}
        showProgress = {true}
        showSkipButton = {true}
        run={props.runTutorial}
        callback={props.handleJoyrideCallback}
      />
      <Grid container spacing={3}>
        {/* Login Button */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " login-button"}>
            <Login />
          </Paper>
        </Grid>
        {/* Available Accounts */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " available-accounts"}>
            <Accounts />
          </Paper>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={12}>
          <Paper className={classes.paper + " logout-button"}>
            <Logout />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
