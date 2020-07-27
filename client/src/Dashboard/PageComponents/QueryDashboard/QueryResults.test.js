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
