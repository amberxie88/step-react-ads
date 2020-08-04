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
import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../../Utilities/Title';
import * as HttpStatus from 'http-status-codes';
import axios from 'axios';
import { LoadingComponent } from '../../../Utilities/Constants';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [data, setData] = useState([]); //data for chart along with setter function
  const [state, setState] = useState('loading');

  useEffect(() => {
    //loads data asynchronously so page can load faster
    (async () => {
      try {
        const { data } = await axios.post(
          '/campaign',
          new URLSearchParams({
            query: `SELECT account_budget.status, 
              account_budget.amount_served_micros, customer.currency_code 
              FROM account_budget`,
          }),
        );
        if (data.meta.status !== HttpStatus.OK.toString()) {
          throw new Error(data.meta.message);
        } else {
          setData(data.response);
          setState('loaded');
        }
      } catch (err) {
        console.log(err.message);
        setData(err.message);
        setState('error');
      }
    })();
  }, []);

  const pickContentToDisplay = () => {
    switch (state) {
      case 'loading':
        return <LoadingComponent />;
      case 'loaded':
        return (
          <div>
            <Typography component="p" variant="h4">
              {data[0]['accountBudget.amountServedMicros'] / 1000000}{' '}
              {data[0]['customer.currencyCode']}
            </Typography>
            <Typography
              color="textSecondary"
              className={classes.depositContext}
            >
              Account Budget Status: {data[0]['accountBudget.status']}
            </Typography>
          </div>
        );
      case 'error':
        return (
          <Title>
            {"Something Went Wrong. Here's the Error Message: " + data}
          </Title>
        );
      default:
        return <Title> Something Went Wrong</Title>;
    }
  };
  return (
    <React.Fragment>
      <Title>Total Ad Spend</Title>

      {pickContentToDisplay()}
    </React.Fragment>
  );
}
