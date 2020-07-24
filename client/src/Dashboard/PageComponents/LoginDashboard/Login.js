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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { redirect: '' };
  }

  async handleLogin() {
    const { data } = await axios.get('/oauth');
    console.log(data);

    this.setState({
      redirect: data,
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
        <a style={{ textDecoration: 'none' }} href={props.onClick}>
          Add Account
        </a>
      </Button>
    </div>
  );
}

export default Login;
