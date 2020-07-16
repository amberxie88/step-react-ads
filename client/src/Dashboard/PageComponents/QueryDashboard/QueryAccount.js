import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Utilities/Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function parseJSON(response) {
  return response.json();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

class QueryAccount extends React.Component {
  constructor(props) {
    super(props);
    this.getClient = this.getClient.bind(this);
    this.state = {
      selectedClient: [],
    };
  }

  getClient() {
    console.log('getting clients');
    const request = new Request('/client', {
      accept: 'application/json',
      method: 'GET',
    });
    fetch(request)
      .then(parseJSON)
      .then((client) => {
        console.log(client);
        this.setState({
          selectedClient: client,
        });
      });
  }

  componentDidMount() {
    this.getClient();
  }

  render() {
    const selectedClient = this.state.selectedClient;
    console.log(selectedClient);
    return (
      <React.Fragment>
        <Title>Selected Client Account to Query</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>Client Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell key={selectedClient.loginId}>
                {selectedClient.loginId}
              </TableCell>
              <TableCell key={selectedClient.customerId}>
                {selectedClient.customerId}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default QueryAccount;
