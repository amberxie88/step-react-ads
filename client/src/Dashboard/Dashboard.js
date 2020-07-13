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
  const classes = Styles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AppBarWithDrawer />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <PageRouter />
          </Container>
        </main>
      </BrowserRouter>
    </div>
  );
}
