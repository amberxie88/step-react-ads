import React from 'react';
import CampaignData from './CampaignData';
import { configure, shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
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
    const component = shallow(<CampaignData />);
    const CampaignDataHTML = component.html();
    expect(CampaignDataHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
