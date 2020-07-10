import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../Utilities/Title';
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
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
    // const request = new Request('/campaign', {
    //   accept: 'application/json',
    //   method: 'GET',
    //   body: params,
    // });
    // fetch(request)
    //   .then(parseJSON)
    //   .then((jsonResult) => {
    //     console.log(jsonResult);
    //     this.setState({
    //       rows: parseRows(jsonResult.response),
    //       fields: jsonResult.fieldmask,
    //     });
    //   });
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
