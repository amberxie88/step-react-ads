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
import { useTheme } from '@material-ui/core/styles';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Title from '../../../Utilities/Title';
import { LoadingComponent } from '../../../Utilities/Constants';

export default function ClicksPerCampaignChart() {
  const theme = useTheme();
  const [data, setData] = useState([]); //data for chart along with setter function
  const [state, setState] = useState('loading');

  useEffect(() => {
    //loads data asynchronously so page can load faster
    (async () => {
      try {
        const { data } = await axios.post(
          '/campaign',
          new URLSearchParams({
            query: `SELECT campaign.name, metrics.clicks FROM campaign ORDER BY metrics.clicks DESC LIMIT 5`,
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
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="campaign.name"
                stroke={theme.palette.text.secondary}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="metrics.clicks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
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
      <Title>Clicks Per Campaign</Title>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}
