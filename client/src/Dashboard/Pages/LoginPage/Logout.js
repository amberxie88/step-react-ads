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

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleLogout() {
    console.log('clicked');
    const { data } = await axios.get('/logout');
    console(data);
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
