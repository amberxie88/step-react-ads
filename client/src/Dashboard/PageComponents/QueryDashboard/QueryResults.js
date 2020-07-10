import React from 'react';
import Title from '../../Utilities/Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function QueryResults(props) {
  const rows = props.rows;
  const fields = props.fields;
  console.log(rows);
  console.log(fields);
  return (
    <React.Fragment>
      <Title>Query Results</Title>
      <Results rows={rows} fields={fields} />
    </React.Fragment>
  );
}

// function DisplayRows(props) {
//   const rows = props.rows;
//   return <Results rows={rows} />;
// }

function Results(props) {
  const rows = props.rows;
  const fields = props.fields;
  console.log(rows);
  console.log(fields);
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          {fields.map((key, index) => (
            <TableCell key={'col' + index}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={'row' + row.id}>
            {fields.map((key) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
