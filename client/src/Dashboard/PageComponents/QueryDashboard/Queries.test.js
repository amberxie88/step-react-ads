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
import Queries from './Queries';
React.useLayoutEffect = React.useEffect; // Necessary to supress warning during tests. The tests use server side rendering which doesn't support useLayoutEffect.
import { configure, shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('Queries Unit Testing', () => {
  it('Queries correctly displays data with properly formatted input', async () => {
    const mockedAPICall = {
      data: {
        response: [
          {
            'campaign.id': '10375582075',
            'campaign.name': 'Sales-Search-1',
            'metrics.clicks': '0',
          },
        ],
        fieldmask: ['campaign.id', 'campaign.name', 'metrics.clicks'],
        meta: { status: HttpStatus.OK.toString() },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('status')).toEqual('loaded');
    expect(component.state('rows')).toEqual([
      {
        'campaign.id': '10375582075',
        'campaign.name': 'Sales-Search-1',
        id: 0,
        'metrics.clicks': '0',
      },
    ]);
    expect(component.state('fields')).toEqual([
      'campaign.id',
      'campaign.name',
      'metrics.clicks',
    ]);
    const QueryResultsHTML = component.find('QueryResults').html();
    expect(QueryResultsHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('Queries correctly displays error with incorrectly formatted input', async () => {
    const mockedAPICall = {
      data: {
        meta: {
          status: HttpStatus.BAD_REQUEST.toString(),
          message: 'Some Kind of Error',
        },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('status')).toEqual('error');
    expect(component.state('errorMessage')).toEqual('Some Kind of Error');
    const ErrorHTML = component.find('Title').at(1).html();
    expect(ErrorHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('Queries correctly displays unexpected error', async () => {
    //In this test, the API will return something unexpected
    const mockedAPICall = {
      data: {},
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('status')).toEqual('error');
    expect(component.state('errorMessage')).toEqual(
      "Cannot read property 'status' of undefined",
    );
    const ErrorHTML = component.find('Title').at(1).html();
    expect(ErrorHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
