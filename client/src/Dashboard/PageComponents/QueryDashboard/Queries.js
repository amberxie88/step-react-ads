import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QueryResults from './QueryResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from '../../Utilities/Title';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

//JSON data parsing here
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

function parseJSON(response) {
  return response.json();
}

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = { value: '', rows: [], fields: [], rowsPerPage: 5 };
  }

  async handleQuery() {
    //alert(this.state.value);
    const query = this.state.value;
    const { data } = await axios.post(
      '/campaign',
      new URLSearchParams({ query }),
    );
    if (data.meta.status !== "200"){
      alert(data.meta.message);
      return;
    }
    this.setState({
        rows: parseRows(data.response),
        fields: data.fieldmask,
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    // const rows = this.state.rows;
    // const fields = this.state.fields;
    return (
      <React.Fragment>
        <Title>Query Here</Title>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          id="standard-full-width"
          label="Enter Query"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="helper text"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        {/* <input type="submit" value="Submit" /> */}
        <SubmitButton onClick={this.handleQuery} />
        <QueryResults rows={this.state.rows} fields={this.state.fields}
          rowsPerPage={this.state.rowsPerPage}
        />
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

export default Query;
