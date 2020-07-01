import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
<<<<<<< HEAD
import Reports from './Reports';
import AppBarWithDrawer from './AppBarWithDrawer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QueryResults from './QueryResults';

import { Styles } from './Styles'; //this must be the last import because it consumes the styles of all the above imports
=======
import Reports from './PageComponents/ReportsDashboard/ReportsDashboard';
import AppBarWithDrawer from './AppBarWithDrawer/AppBarWithDrawer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QueryResults from './PageComponents/QueryDashboard/QueryResults';
import { makeStyles } from '@material-ui/core/styles';
import { PageRouter } from './PageComponents/PageRouter';
import { stylesSettings } from './Utilities/Styles';
const Styles = makeStyles(stylesSettings);
>>>>>>> ed2397bae0d27dbe52e303975a27c82028025648

export default function Dashboard() {
  const classes = Styles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBarWithDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
<<<<<<< HEAD
            <Switch>
              <Route path={'/Dashboard'}>
                <Reports classes={classes} />
              </Route>
              <Route path={'/Queries'}>
                <QueryResults />
              </Route>
            </Switch>
=======
            <PageRouter />
>>>>>>> ed2397bae0d27dbe52e303975a27c82028025648
          </Container>
        </main>
      </BrowserRouter>
    </div>
  );
}
