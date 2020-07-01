import React from 'react';
<<<<<<< HEAD:client/src/Dashboard/PageComponents/QueryDashboard/Queries.js

=======
import { makeStyles } from '@material-ui/core/styles';
import QueryResults from './QueryResults';
>>>>>>> dev_kc:client/src/Dashboard/Queries.js
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from './Title';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

//JSON data parsing here
function createData(results) {
  const id = results[0]['campaign.id'];
  const name = results[0]['campaign.name'];
  const adGroupName = results[0]['adGroup.name'];
  const keyword = results[0]['adGroupCriterion.keyword.text'];
  return { id, name, adGroupName, keyword };
}

function parseJSON(response) {
  return response.json();
}

class Query extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = { value: '', rows: [] };
  }

  handleQuery() {
    alert('A query was submitted: ' + this.state.value);
    const query = this.state.value;
    const params = new URLSearchParams();
    params.append('query', query);
    const request = new Request('/campaign', {
      accept: 'application/json',
      method: 'POST',
      body: params,
    });
    fetch(request)
      .then(parseJSON)
      .then((jsonResult) => {
        console.log(jsonResult.response);
        this.setState({
          rows: [createData(jsonResult.response)],
        });
      });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const rows = this.state.rows;
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
        <QueryResults rows={rows} />
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
