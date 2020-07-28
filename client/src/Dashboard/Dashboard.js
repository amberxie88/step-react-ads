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
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBarWithDrawer from './AppBarWithDrawer/AppBarWithDrawer';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageRouter } from './PageComponents/PageRouter';
import { stylesSettings } from './Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function Dashboard() {
  /*setter, variable, prop in appbarwithdrawer*/
  const [runTutorial, setRunTutorial] = React.useState(true);
  const classes = Styles();

  function handleJoyrideCallback(data) {
    const {status, type} = data;
    if (status == "ready") {
      setRunTutorial(false);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBarWithDrawer setTutorial={setRunTutorial}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <PageRouter tutorial={runTutorial} handleJoyrideCallback={handleJoyrideCallback}/>
          </Container>
        </main>
      </BrowserRouter>
    </div>
  );
}
