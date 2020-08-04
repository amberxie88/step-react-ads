/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
    try {
      const { data } = await axios.get('/oauth');
      this.setState({
        redirect: data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.handleLogin();
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
