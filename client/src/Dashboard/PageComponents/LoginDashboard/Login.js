import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../Utilities/Title';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

function parseJSON(response) {
  return response.json();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    //this.state = { value: '', rows: [], fields: [] };
  }

  handleLogin() {
    alert('login requested');

    const request = new Request('/oauth', {
      //accept: 'application/json',
      method: 'GET',
      mode: 'cors', //allow CORS
    });
    fetch(request) //.then(console.log('logged in!'));
      .then(parseJSON)
      .then((jsonResult) => {
        console.log(jsonResult);
        console.log(jsonResult.redirect);
        //window.open(jsonResult.redirect, '_blank');
        window.location.href = jsonResult.redirect;
      }
      );
    // .then((jsonResult) => {
    //   console.log(jsonResult);
    //   this.setState({
    //     rows: parseRows(jsonResult.response),
    //     fields: jsonResult.fieldmask,
    //   });
    // });
  }

  render() {
    return (
      <React.Fragment>
        <Title>Authenticate your Ads Account</Title>
        <LoginButton onClick={this.handleLogin} />
      </React.Fragment>
    );
  }
}

function LoginButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" onClick={props.onClick}>
        Add Account
      </Button>
    </div>
  );
}

export default Login;
