import React from 'react';
import Queries from './Queries';
import { configure, shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

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
        meta: { status: '200' },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('status')).toMatchSnapshot();
    expect(component.state('rows')).toMatchSnapshot();
    expect(component.state('fieldmask')).toMatchSnapshot();
    const QueryResultsHTML = component.find('QueryResults').html();
    expect(QueryResultsHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });

  it('Queries correctly displays data with properly formatted input', async () => {
    const mockedAPICall = {
      data: {
        meta: { status: '400', message: 'Some Kind of Error' },
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockedAPICall));
    const component = shallow(<Queries />);
    component.find('SubmitButton').simulate('click'); //click the submit button. This should trigger the api call
    await waitForState(component, (state) => state.rows !== []); //wait for rows state variable to change from initial state
    expect(component.state('status')).toMatchSnapshot();
    expect(component.state('errorMessage')).toMatchSnapshot();
    const ErrorHTML = component.find('Title').at(1).html();
    expect(ErrorHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
