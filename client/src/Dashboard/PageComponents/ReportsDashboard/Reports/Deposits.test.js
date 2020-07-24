import React from 'react';
import Deposits from './Deposits';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Deposits Unit Testing', () => {
  it('Deposits correctly displays data with correct API call', async () => {
    const component = shallow(<Deposits />);
    const chartHTML = component.html();
    expect(chartHTML).toMatchSnapshot();
  });
});
