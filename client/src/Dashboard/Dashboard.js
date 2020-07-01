import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Reports from './Reports';
import AppBarWithDrawer from './AppBarWithDrawer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import QueryResults from './QueryResults';

import { Styles } from './Styles'; //this must be the last import because it consumes the styles of all the above imports

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
            <Switch>
              <Route path={'/Dashboard'}>
                <Reports classes={classes} />
              </Route>
              <Route path={'/Queries'}>
                <QueryResults />
              </Route>
            </Switch>
          </Container>
        </main>
      </BrowserRouter>
    </div>
  );
}
