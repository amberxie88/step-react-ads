import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../../Utilities/Title';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function CampaignData() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async function getData() {
      const response = await axios.post(
        '/campaign',
        new URLSearchParams({
          query: `SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions
      FROM campaign`,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      setRows(response.data.response);
    })();
  }, []);
  return (
    <React.Fragment>
      <Title>Campaign Data</Title>
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
          {rows.map((row) => (
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
    </React.Fragment>
  );
}
