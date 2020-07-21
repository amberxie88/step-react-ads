import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Utilities/Title';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { redirect: '' };
  }

  handleLogin() {
    const request = new Request('/oauth', {
      accept: 'application/json',
      method: 'GET',
    });
    fetch(request)
      .then((request) => request.text())
      .then((text) => {
        console.log(text);
        this.setState({
          redirect: text,
        });
      });
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLogin);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLogin);
  }

  render() {
    return (
      <React.Fragment>
        <Title>Authenticate your Ads Account</Title>
        <LoginButton onClick={this.state.redirect} />
      </React.Fragment>
    );
  }
}

function LoginButton(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined">
        <a
          style={{ textDecoration: 'none' }}
          href={props.onClick}
          //target="_blank"
        >
          Add Account
        </a>
      </Button>
    </div>
  );
}

export default Login;