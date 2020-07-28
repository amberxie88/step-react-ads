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
import Login from './Login';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Button from '@material-ui/core/Button';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('Login Unit Testing', () => {
  it('Login displays button with correct link with correct API call', async () => {
    const mockedAPICall = {
      data: 'TEST_URL',
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<Login />);
    await act(async () => {
      //this code waits for the component to render fully after the asynchronous API call
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const redirectURL = component.find(Button).find('a').prop('href');

    expect(redirectURL).toEqual(mockedAPICall.data);

    const loginHTML = component.html();
    expect(loginHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  //TODO add test and logic for what happens when axios call fails
});
