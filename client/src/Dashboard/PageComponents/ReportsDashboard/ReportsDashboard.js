import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Reports/Chart';
import Deposits from './Reports/Deposits';
import Orders from './Reports/Orders';
import { makeStyles } from '@material-ui/core/styles';

import { stylesSettings } from '../../Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function Reports(props) {
  const classes = Styles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Query */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Query />
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
