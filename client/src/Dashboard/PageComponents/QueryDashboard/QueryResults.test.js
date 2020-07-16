import React from 'react';
import QueryResults from './QueryResults';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('QueryResults Unit Testing', () => {
  it('QueryResults properly displays table given correct input', async () => {
    const testRows = [
      { 'campaign.name': 'Sales-Search-1', 'metrics.clicks': '0', id: 0 },
    ];
    const testFields = ['campaign.name', 'metrics.clicks'];
    const component = shallow(
      <QueryResults rows={testRows} fields={testFields} />,
    );
    const componentHTML = component.html();
    expect(componentHTML).toMatchSnapshot(); //displayed state also needs to match expected results
  });
});
