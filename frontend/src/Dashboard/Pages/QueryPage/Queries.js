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
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';
import { makeStyles } from '@material-ui/core/styles';
import QueryResults from './QueryResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../Utilities/Title';
import { LoadingComponent } from '../../Utilities/Constants';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

//add key for table rows
function addKey(index, responseObj) {
  responseObj.id = index;
  return responseObj;
}

function parseRows(response) {
  const responseRows = [];
  let i;
  for (i = 0; i < response.length; i++) {
    responseRows.push(addKey(i, response[i]));
  }
  return responseRows;
}

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = {
      value: '',
      rows: [],
      fields: [],
      rowsPerPage: 5,
      status: 'inputRequired',
      errorMessage: '',
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleQuery(event, exportTable) {
    const query = this.state.value;
    if (!exportTable) {
      this.setState({ status: 'loading' });
    }
    try {
      const { data } = await axios.post(
        '/campaign',
        new URLSearchParams({ query, exportTable }),
      );
      if (data.meta.status !== HttpStatus.OK.toString()) {
        throw new Error(data.meta.message);
      } else {
        //don't rerender table if exporting
        if (exportTable) {
          alert('export successful');
        } else {
          this.setState({
            rows: parseRows(data.response),
            fields: data.fieldmask,
            status: 'loaded',
          });
        }
      }
    } catch (err) {
      console.log(err.message);
      this.setState({ status: 'error', errorMessage: err.message });
    }
  }

  pickContentToDisplay() {
    switch (this.state.status) {
      case 'inputRequired':
        return <Title> Enter a query to see the results </Title>;
      case 'loading':
        return <LoadingComponent />;
      case 'loaded':
        return (
          <React.Fragment>
            <QueryResults
              rows={this.state.rows}
              fields={this.state.fields}
              rowsPerPage={this.state.rowsPerPage}
            />
            <ExportButton onClick={(e) => this.handleQuery(e, true)} />
          </React.Fragment>
        );
      case 'error':
        return (
          <Title>
            {"Something Went Wrong. Here's the Error Message: " +
              this.state.errorMessage}
          </Title>
        );
      default:
        return <Title> Something Went Wrong</Title>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Title>Query Here</Title>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          id="standard-full-width"
          label="Enter Query"
          style={{ margin: 8 }}
          placeholder="SELECT campaign.id, campaign.name FROM campaign"
          helperText="make sure to select an account!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SubmitButton onClick={(e) => this.handleQuery(e, false)} />
        {this.pickContentToDisplay()}
      </React.Fragment>
    );
  }
}

function SubmitButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={props.onClick}>
        Submit
      </Button>
    </div>
  );
}

function ExportButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={props.onClick}>
        Export to Google Sheets
      </Button>
    </div>
  );
}

export default Query;
