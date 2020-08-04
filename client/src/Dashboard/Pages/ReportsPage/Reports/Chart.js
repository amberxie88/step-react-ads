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
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Title from '../../../Utilities/Title';
import { LoadingComponent } from '../../../Utilities/Constants';

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [state, setState] = useState('loading');
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
           '/campaign',
           new URLSearchParams({
             query: `SELECT campaign.name, metrics.impressions, metrics.clicks, segments.device FROM campaign
                WHERE segments.date DURING LAST_30_DAYS AND metrics.impressions > 0 
                ORDER BY metrics.clicks ASC LIMIT 100`,
           })
        );
        console.log(data);
        if (data.meta.status !== HttpStatus.OK.toString()) {
          throw new Error(data.meta.message);
        } else {
          for (var i = 0; i < data.response.length; i++) {
            data.response[i]["metrics.clicks"] = +data.response[i]["metrics.clicks"];
          }
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
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 24,
                left: 24,
              }}
            >
              <XAxis 
                dataKey="metrics.impressions" 
                stroke={theme.palette.text.secondary} 
                domain={[0, 'dataMax']}
              >
                <Label
                  position="bottom"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                  }}
                >
                Impressions over last 30 days
                </Label>
              </XAxis>
              <YAxis dataKey="metrics.clicks" stroke={theme.palette.text.secondary} domain={[0, 'dataMax']}>
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                  }}
                >
                  Ad clicks
                </Label>
              </YAxis>
              <ZAxis dataKey={'campaign.name'} name='campaign' />
              <Line
                type="monotone"
                dataKey="metrics.clicks"
                stroke={theme.palette.primary.main}
                dot={true}
              />
            </LineChart>
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
      <Title>Ad Clicks vs. Impressions (Last 30 Days)</Title>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}
