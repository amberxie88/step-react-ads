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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../../Utilities/Title';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function CampaignData() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/campaign',
          new URLSearchParams({
            query: `SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions FROM campaign ORDER BY campaign.id          `,
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
        return <Title> Loading ... </Title>;
      case 'loaded':
        return (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Impressions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row['campaign.id']}>
                  <TableCell>{row['campaign.id']}</TableCell>
                  <TableCell>{row['campaign.name']}</TableCell>
                  <TableCell>{row['campaign.status']}</TableCell>
                  <TableCell>{row['metrics.clicks']}</TableCell>
                  <TableCell>{row['metrics.impressions']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      <Title>Campaign Data</Title>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}
