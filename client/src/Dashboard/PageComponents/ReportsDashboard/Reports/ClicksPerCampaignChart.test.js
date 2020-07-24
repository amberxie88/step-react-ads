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
import ClicksPerCampaignChart from './ClicksPerCampaignChart';
import { configure, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import * as HttpStatus from 'http-status-codes';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('ClicksPerCampaignChart Unit Testing', () => {
  it('ClicksPerCampaignChart correctly displays data with correct API call', async () => {
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
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<ClicksPerCampaignChart />);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const chartHTML = component.html();
    expect(chartHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('ClicksPerCampaignChart correctly displays error when API call returns error', async () => {
    const mockedAPICall = {
      data: {
        meta: {
          status: HttpStatus.BAD_REQUEST.toString(),
          message: 'Some kind of Error',
        },
      },
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<ClicksPerCampaignChart />);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const chartHTML = component.html();
    expect(chartHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('ClicksPerCampaignChart correctly displays unexpected error', async () => {
    //In this test, the API will return something unexpected
    const mockedAPICall = {
      data: {},
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<ClicksPerCampaignChart />);
    await act(async () => {
      //this code waits for the component to render fully after the asynchronous API call
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const chartHTML = component.html();
    expect(chartHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
