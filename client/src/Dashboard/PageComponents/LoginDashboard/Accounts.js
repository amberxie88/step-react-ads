import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Utilities/Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

function parseJSON(response) {
  return response.json();
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.state = {
      customerIds: [],
      selected: '',
    };
  }

  fetchCustomers() {
    console.log('fetching customers');
    const request = new Request('/customer', {
      accept: 'application/json',
      method: 'GET',
    });
    fetch(request)
      .then(parseJSON)
      .then((customers) => {
        console.log(customers.response);
        this.setState({
          customerIds: customers.response,
        });
      });
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  isSelected(id) {
    return this.state.selected === id;
  }

  handleClick = (event, row) => {
    this.setState({
      selected: row.id,
    });
    const params = new URLSearchParams();
    params.append('loginId', row.id);
    params.append('customerId', row.children);
    console.log(row.id);
    console.log(row.children);
    const request = new Request('/client', {
      accept: 'application/json',
      method: 'POST',
      body: params,
    });
    fetch(request)
      .then((request) => request.text())
      .then((text) => {
        alert(text);
      });
  };

  render() {
    const customerIds = this.state.customerIds;
    console.log(customerIds);
    return (
      <React.Fragment>
        <Title>Available Customer IDs</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>Login ID</TableCell>
              <TableCell>Client Account ID</TableCell>
              <TableCell>Client Account Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerIds.map((row) => (
              <TableRow
                key={row.id}
                onClick={(event) => this.handleClick(event, row)}
                role="checkbox"
                aria-checked={this.isSelected(row.id)}
                tabIndex={-1}
                selected={this.isSelected(row.id)}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={this.isSelected(row.id)} />
                </TableCell>
                <TableCell key={row.id}>{row.id}</TableCell>
                <TableCell key={row.children}>{row.children}</TableCell>
                <TableCell key={row.name}>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Accounts;
