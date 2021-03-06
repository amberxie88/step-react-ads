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
React.useLayoutEffect = React.useEffect; // Necessary to supress warning during tests. The tests use server side rendering which doesn't support useLayoutEffect.
import QueryPageLayout from './QueryPageLayout';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('QueryPageLayout Unit Testing', () => {
  it('renders correct HTML for Query Dashboard', async () => {
    const component = shallow(<QueryPageLayout />);
    const componentHTML = component.html();
    expect(componentHTML).toMatchSnapshot();
  });
});
