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

  return (
    <React.Fragment>
      <Title>Query Results</Title>
      <Results rows={rows} fields={fields} />
    </React.Fragment>
  );
}

function Results(props) {
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

  const rowSlice = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
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
          {rowSlice.map((row) => (
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
