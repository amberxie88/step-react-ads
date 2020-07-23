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

export default function ClicksPerCampaignChart() {
  const theme = useTheme();
  const [data, setData] = useState([]); //data for chart along with setter function
  const [state, setState] = useState('loading');

  useEffect(() => {
    //loads data asynchronously so page can load faster
    (async () => {
      try {
        const { data } = await axios.get('/data'); //fake data so there's some actual results
        console.log(data);
        // only returns 1 campaign
        // const response = await axios.post(
        //   '/campaign',
        //   new URLSearchParams({
        //     query: `SELECT campaign.name, metrics.clicks FROM campaign ORDER BY campaign.id`,
        //   })
        // );
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
