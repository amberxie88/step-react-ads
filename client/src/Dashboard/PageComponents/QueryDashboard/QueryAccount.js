import React from 'react';
import axios from 'axios';
import Title from '../../Utilities/Title';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class QueryAccount extends React.Component {
  constructor(props) {
    super(props);
    this.getClient = this.getClient.bind(this);
    this.state = {
      selectedClient: [],
      status: 'none selected',
    };
  }

  async getClient() {
    this.setState({ status: 'loading' });
    const { data } = await axios.get('/client');
    console.log(data);
    if (data.loginId) {
      this.setState({
        selectedClient: data,
        status: 'loaded',
      });
    } else {
      this.setState({ status: 'none selected' });
    }
  }

  pickContentToDisplay() {
    const selectedClient = this.state.selectedClient;
    switch (this.state.status) {
      case 'none selected':
        return (
          <Typography variant="overline">
            Select a client on the login page.
          </Typography>
        );
      case 'loading':
        return <Typography variant="overline">Loading . . .</Typography>;
      case 'loaded':
        return (
          <TableBody>
            <TableRow>
              <TableCell key={selectedClient.loginId}>
                {selectedClient.loginId}
              </TableCell>
              <TableCell key={selectedClient.customerId}>
                {selectedClient.customerId}
              </TableCell>
              <TableCell key={selectedClient.name}>
                {selectedClient.name}
              </TableCell>
            </TableRow>
          </TableBody>
        );
      default:
        return (
          <Typography variant="overline">
            Select a client on the login page.
          </Typography>
        );
    }
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
              <TableCell>Client Account ID</TableCell>
              <TableCell>Client Account Name</TableCell>
            </TableRow>
          </TableHead>
          {this.pickContentToDisplay()}
        </Table>
      </React.Fragment>
    );
  }
}

export default QueryAccount;
