import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Login from './Login';
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
      </Grid>
    </React.Fragment>
  );
}
