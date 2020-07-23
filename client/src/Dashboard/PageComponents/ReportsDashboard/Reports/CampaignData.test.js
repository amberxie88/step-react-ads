import React from 'react';
import CampaignData from './CampaignData';
import { configure, mount } from 'enzyme';
import { waitForElement } from 'enzyme-async-helpers';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('CampaignData Unit Testing', () => {
  it('CampaignData correctly displays data with correct API call', async () => {
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
        meta: { status: '200' },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<CampaignData />);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const CampaignDataHTML = component.html();
    expect(CampaignDataHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('CampaignData correctly displays error when API call returns error', async () => {
    const mockedAPICall = {
      data: {
        meta: { status: '400', message: 'Some kind of Error' },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = mount(<CampaignData />);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const CampaignDataHTML = component.html();
    expect(CampaignDataHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
