import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function QueryResults(props) {
  const rows = props.rows;
  console.log(rows);
  return (
    <React.Fragment>
      <Title>Query Results</Title>
      <DisplayRows rows={rows} />
    </React.Fragment>
  );
}

function DisplayRows(props) {
  const rows = props.rows;
  return <Results rows={rows} />;
}

function Results(props) {
  const rows = props.rows;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Campaign ID</TableCell>
          <TableCell>Campaign Name</TableCell>
          <TableCell>Ad Group Name</TableCell>
          <TableCell>Keyword</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.adGroupName}</TableCell>
            <TableCell>{row.keyword}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
