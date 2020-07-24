import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Utilities/Title';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    console.log('clicked');
    const { data } = await axios.get('/logout');
    alert(data);
    window.location.reload(true);
  }

  render() {
    return (
      <React.Fragment>
        <Title>Logout</Title>
        <LogoutButton onClick={this.handleLogout} />
      </React.Fragment>
    );
  }
}

function LogoutButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={props.onClick}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
