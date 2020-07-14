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
import Title from '../../../Utilities/Title';

export default function ClicksPerCampaignChart() {
  const theme = useTheme();
  const [data, setData] = useState([]); //data for chart along with setter function

  useEffect(() => {
    //loads data asynchronously so page can load faster
    (async function getData() {
      const { data } = await axios.get('/data'); //fake data so there's some actual results

      // only returns 1 campaign
      // const response = await axios.post(
      //   '/campaign',
      //   new URLSearchParams({
      //     query: `SELECT campaign.name, metrics.clicks FROM campaign ORDER BY campaign.id`,
      //   }),
      //   {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //     },
      //   },
      // );

      setData(data.response);
    })();
  }, []);

  return (
    <React.Fragment>
      <Title>Clicks Per Campaign</Title>
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
    </React.Fragment>
  );
}
