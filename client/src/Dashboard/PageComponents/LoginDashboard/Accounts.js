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
    this.state = { customerIds: [] };
  }

  fetchCustomers() {
    console.log('fetching customers');
    const request = new Request('/customer', {
      accept: 'application/json',
      method: 'GET',
    });
    fetch(request)
      .then(parseJSON)
      .then((idArr) => {
        console.log(idArr.response);
        // this.setState({
        //   customerIds: idArr,
        // });
        this.setState({
          customerIds: idArr.response,
        });
      });
  }

  componentDidMount() {
    window.addEventListener('load', this.fetchCustomers);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.fetchCustomers);
  }

  render() {
    const customerIds = this.state.customerIds;
    console.log(customerIds);
    return (
      <React.Fragment>
        <Title>Available Customer IDs</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerIds.map((row) => (
              <TableRow key={row.id}>
                <TableCell key={row.id}>{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Accounts;
