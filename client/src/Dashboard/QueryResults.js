import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Query from './Queries';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

// const rows = [];

function createData(id, result) {
  return { id, result };
}

function parseJSON(response) {
  return response.json();
}

class QueryResults extends React.Component {
  constructor(props) {
    super(props);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = { rows: [] };
  }

  handleQuery() {
    alert('The button was clicked.');
    fetch('/campaign', {
      accept: 'application/json',
    })
      .then(parseJSON)
      .then((result) => {
        this.setState({
          rows: [createData(0, result)],
        });
      });
  }

  render() {
    const rows = this.state.rows;

    let button = <SubmitButton onClick={this.handleQuery} />;

    return (
      <React.Fragment>
        <Title>Query Here</Title>
        <Query />
        {button}
        <DisplayRows rows={rows} />
      </React.Fragment>
    );
  }
}

function Results(props) {
  const rows = props.rows;
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Results</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.result}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DisplayRows(props) {
  const rows = props.rows;
  return <Results rows={rows} />;
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

export default QueryResults;
