import React from 'react';
React.useLayoutEffect = React.useEffect; // Necessary to supress warning during tests. The tests use server side rendering which doesn't support useLayoutEffect.
import QueryDashboard from './QueryDashboard';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('QueryDashboard Unit Testing', () => {
  it('renders correct HTML for Query Dashboard', async () => {
    const component = shallow(<QueryDashboard />);
    const componentHTML = component.html();
    expect(componentHTML).toMatchSnapshot();
  });
});
