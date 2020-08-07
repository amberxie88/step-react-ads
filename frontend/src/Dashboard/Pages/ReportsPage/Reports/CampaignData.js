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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Title from '../../../Utilities/Title';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import { TableSortLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const headCells = [
  {
    id: "campaign.id",
    numeric: false,
    label: "Id"
  },
  { id: "campaign.name", numeric: false, label: "Name" },
  { id: "campaign.status", numeric: false, label: "Status" },
  { id: "metrics.clicks", numeric: true, label: "Clicks" },
  { id: "metrics.impressions", numeric: true, label: "Impressions" }
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};


export default function CampaignData() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [state, setState] = useState('loading');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("campaign.id");
  const [dense, setDense] = React.useState(false);

  const handleChangeRowsPerPage = (event) => {
    // If the selection is [A]ll the rows.
    if (event.target.value.toString().charAt(0) === 'A') {
      event.target.value = data.length;
    }
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/campaign',
          new URLSearchParams({
            query: `SELECT campaign.id, campaign.name, campaign.status, metrics.clicks, metrics.impressions FROM campaign ORDER BY campaign.id          `,
          }),
        );
        for (var i = 0; i < data.response.length; i++) {
          data.response[i]["campaign.id"] = +data.response[i]["campaign.id"];
          data.response[i]["metrics.clicks"] = +data.response[i]["metrics.clicks"];
          data.response[i]["metrics.impressions"] = +data.response[i]["metrics.impressions"];
        }
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
          <div>
            <Table size="small">
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                (row, index) => {
                  return (
                    <TableRow key={row['campaign.id']}>
                      <TableCell>{row['campaign.id']}</TableCell>
                      <TableCell>{row['campaign.name']}</TableCell>
                      <TableCell>{row['campaign.status']}</TableCell>
                      <TableCell>{row['metrics.clicks']}</TableCell>
                      <TableCell>{row['metrics.impressions']}</TableCell>
                    </TableRow>
                  );
                }
              )}
              
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                'All ' + data.length.toString() + ' Rows',
              ]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
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
      <Title>Campaign Data</Title>
      {pickContentToDisplay()}
    </React.Fragment>
  );
}