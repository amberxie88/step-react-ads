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
  Label,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Title from '../../../Utilities/Title';
import { createChainedFunction } from '@material-ui/core';

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const [state, setState] = useState('loading');
  useEffect(() => {
    (async () => {
      try {
        // const {data} = await axios.get('/data');
        const data = {
          meta: { status: HttpStatus.OK.toString() },
          response: {
            data: [
              {
                time: '00:00',
                amount: 0,
              },
              {
                time: '03:00',
                amount: 300,
              },
              {
                time: '06:00',
                amount: 600,
              },
              {
                time: '09:00',
                amount: 800,
              },
              {
                time: '12:00',
                amount: 1500,
              },
              {
                time: '15:00',
                amount: 2000,
              },
              {
                time: '18:00',
                amount: 2400,
              },
              {
                time: '21:00',
                amount: 2400,
              },
              {
                time: '24:00',
                amount: 'undefined',
              },
            ],
          },
        };
        if (data.meta.status !== HttpStatus.OK.toString()) {
          throw new Error(data.meta.message);
        } else {
          setData(data.response.data);
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
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                  }}
                >
                  Sales ($)
                </Label>
              </YAxis>
              <Line
                type="monotone"
                dataKey="amount"
                stroke={theme.palette.primary.main}
                dot={false}
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
      <Title>Today's Sales</Title>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}
