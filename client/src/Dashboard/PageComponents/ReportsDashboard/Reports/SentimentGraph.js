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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import Title from '../../../Utilities/Title';
import { createChainedFunction } from '@material-ui/core';

export default function SentimentGraph() {
  const theme = useTheme();
  const [scatterData, setScatterData] = useState([]);
  const useStyles = makeStyles({
    depositContext: {
      flex: 1,
    },
  });
  const classes = useStyles();
  const [state, setState] = useState('loading');
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/chart-api');
        console.log(data);
        if (data.meta.status !== HttpStatus.OK.toString()) {
          throw new Error(data.meta.message);
        } else {
          for (var i = 0; i < data.response.length; i++) {
            data.response[i]["metrics.clicks"] = +data.response[i]["metrics.clicks"];
          }
          setScatterData(data.response);
          setState('loaded');
        }
      } catch (err) {
        console.log(err.message);
        setScatterData(err.message);
        setState('error');
      }
    })();
  }, []);

  const pickContentToDisplay = () => {
    switch (state) {
      case 'loading':
        return <Title> Loading ... </Title>;
      case 'loaded':
        var clicksArr = scatterData.map(point => point["metrics.clicks"]);
        var maxClicks = Math.max(...clicksArr);
        return (
          <ResponsiveContainer>
            <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
              <CartesianGrid />
              <XAxis 
                dataKey={'sentiment'} 
                type="number" 
                name='sentiment'
                domain={[0, 1]}
              >
                <Label
                  position="bottom"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                  }}
                >
                Sentiment
                </Label>
              </XAxis>
              <YAxis 
                dataKey={'metrics.clicks'} 
                type="number" 
                name='clicks' 
                domain={[0, 'dataMax']}
              >
                <Label
                  angle={270}
                  position="left"
                  style={{
                    textAnchor: 'middle',
                    fill: theme.palette.text.primary,
                  }}
                >
                Clicks
                </Label>
              </YAxis>
              <ZAxis dataKey={'headline'} name='ad headline' />
              <Scatter name='Sentiment Graph' data={scatterData} fill='#8884d8'/>
              <Tooltip cursor={{strokeDasharray: '3 3'}}/>
            </ScatterChart>
          </ResponsiveContainer>
        );
      case 'error':
        return (
          <Title>
            {"Something Went Wrong. Here's the Error Message: " + scatterData}
          </Title>
        );
      default:
        return <Title> Something Went Wrong</Title>;
    }
  };

  return (
    <React.Fragment>
      <Title>Sentiment vs. Clicks</Title>
      <Typography color="textSecondary" className={classes.depositContext}>
        Description (extended text ad headlines calculate sentiment)
      </Typography>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}
