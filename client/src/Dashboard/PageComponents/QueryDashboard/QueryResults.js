import React from 'react';
import Title from '../../Utilities/Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

export default function QueryResults(props) {
  const { rows, fields } = props;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // If the selection is [A]ll the rows.
    if (event.target.value.toString().charAt(0) === 'A') {
      event.target.value = rows.length;
    }
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <React.Fragment>
      <Title>Query Results</Title>
      <Results
        rows={rows}
        fields={fields}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}

function Results(props) {
  const rows = props.rows;
  const fields = props.fields;
  const rowsPerPage = props.rowsPerPage;
  const page = props.page;
  const handleChangePage = props.handleChangePage;
  const handleChangeRowsPerPage = props.handleChangeRowsPerPage;
  //console.log(rows);
  //console.log(fields);
  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            {fields.map((key, index) => (
              <TableCell key={'col' + index}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <TableRow key={'row' + row.id}>
                {fields.map((key) => (
                  <TableCell key={key}>{row[key]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          'All ' + rows.length.toString() + ' Rows',
        ]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
