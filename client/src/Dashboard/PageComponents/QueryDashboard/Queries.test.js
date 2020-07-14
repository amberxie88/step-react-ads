// Link.react.test.js
import React from 'react';
import Queries from './Queries';
import { configure, shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('Queries Unit Testing', () => {
  it('Queries correctly saves data with properly formatted input', async () => {
    const mockedAPICall = {
      // data return from api for correct call
      data: {
        response: [
          {
            'campaign.id': '10375582075',
            'campaign.name': 'Sales-Search-1',
            'metrics.clicks': '0',
          },
        ],
        fieldmask: ['campaign.id', 'campaign.name', 'metrics.clicks'],
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('rows')).toMatchSnapshot(); //internal state needs to match expected results
    const QueryResultsHTML = component.find('QueryResults').html();
    expect(QueryResultsHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
