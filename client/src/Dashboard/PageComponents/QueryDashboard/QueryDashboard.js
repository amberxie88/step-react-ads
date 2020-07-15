import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Query from './Queries';
import { makeStyles } from '@material-ui/core/styles';

import { stylesSettings } from '../../Utilities/Styles';
const Styles = makeStyles(stylesSettings);

export default function Queries(props) {
  const classes = Styles();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {/* CampaignData */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Query />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
