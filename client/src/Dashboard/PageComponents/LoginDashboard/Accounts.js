import React from 'react';
import axios from 'axios';
import Title from '../../Utilities/Title';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.state = {
      customerIds: [],
      selected: '',
      status: 'none authenticated',
      errorMessage: '',
    };
  }

  async fetchCustomers() {
    this.setState({ status: 'loading' });

    try {
      const { data } = await axios.get('/customer');

      if (data.meta.status !== '200') {
        throw new Error(data.meta.message);
      } else {
        console.log(data.response);
        this.setState({
          customerIds: data.response,
          status: 'loaded',
        });
      }
    } catch (err) {
      console.log(err.message);
      this.setState({
        status: 'none authenticated',
        errorMessage: err.message,
      });
    }
  }

  pickContentToDisplay() {
    const customerIds = this.state.customerIds;
    console.log(customerIds);
    switch (this.state.status) {
      case 'none authenticated':
        return (
          <Typography variant="overline">
            Log in to access your accounts.
          </Typography>
        );
      case 'error':
        return (
          <Typography variant="overline">
            {"Something Went Wrong. Here's the Error Message: " +
              this.state.errorMessage}
          </Typography>
        );
      case 'loading':
        return <Typography variant="overline">Loading . . .</Typography>;
      case 'loaded':
        return (
          <TableBody>
            {customerIds.map((row) => (
              <TableRow
                key={row.id}
                onClick={(event) => this.handleClick(event, row)}
                role="checkbox"
                aria-checked={this.isSelected(row.child)}
                tabIndex={-1}
                selected={this.isSelected(row.child)}
                hover
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={this.isSelected(row.child)} />
                </TableCell>
                <TableCell key={row.id}>{row.id}</TableCell>
                <TableCell key={row.child}>{row.child}</TableCell>
                <TableCell key={row.name}>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        );
      default:
        return (
          <Typography variant="overline">
            Log in to access your accounts.
          </Typography>
        );
    }
  }

  componentDidMount() {
    this.fetchCustomers();
    this.setState({
      selected: '',
    });
  }

  isSelected(id) {
    return this.state.selected === id;
  }

  async handleClick(event, row) {
    this.setState({
      selected: row.child,
    });
    const loginId = row.id;
    const customerId = row.child;
    const name = row.name;
    const { data } = await axios.post(
      '/client',
      new URLSearchParams({ loginId, customerId, name }),
    );
    alert(data);
  }

  render() {
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
          {this.pickContentToDisplay()}
        </Table>
      </React.Fragment>
    );
  }
}

export default Accounts;
