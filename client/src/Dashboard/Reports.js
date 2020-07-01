import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import QueryResults from './QueryResults';

import { Styles } from './Styles'; //this must be the last import because it consumes the styles of all the above imports

export default function Reports(props) {
  const { classes } = props;
  console.log(props.classes);
  console.log(classes);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* Query */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <QueryResults />
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

Reports.propTypes = {
  classes: PropTypes.object,
};
