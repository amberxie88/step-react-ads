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
import Title from '../../../Utilities/Title';

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function getData() {
      // const response = await axios.get('/data');
      const response = {
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
      };
      setData(response.data);
    })();
  }, []);

  return (
    <React.Fragment>
      <Title>Today's Sales</Title>
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
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
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
    </React.Fragment>
  );
}
