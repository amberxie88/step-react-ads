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
import Accounts from './Accounts';
React.useLayoutEffect = React.useEffect; // Necessary to supress warning during tests. The tests use server side rendering which doesn't support useLayoutEffect.
import { configure, shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import TableCell from '@material-ui/core/TableCell';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('Accounts Unit Testing', () => {
  it('Accounts correctly displays data with ok API call', async () => {
    const mockedAPICall = {
      data: {
        response: [
          {
            id: 'testId',
            child: 'testChildren',
            name: 'testName',
          },
        ],
        meta: { status: '200' },
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Accounts />);
    await waitForState(
      component,
      (state) =>
        state.status !== 'none authenticated' && state.status !== 'loading',
    ); //wait for status to change from initial state
    expect(component.state('status')).toEqual('loaded');
    expect(component.state('customerIds')).toEqual(mockedAPICall.data.response);

    const tableCells = component.find(TableCell);
    const requiredFields = Object.values(mockedAPICall.data.response[0]);
    requiredFields.forEach((field) => {
      const foundTableCell = tableCells.findWhere(
        (cell) => cell.key() === field,
      );
      expect(foundTableCell.isEmpty()).toBeFalsy();
    });

    const accountsHTML = component.html();
    expect(accountsHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
