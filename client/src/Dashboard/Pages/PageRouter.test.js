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
import { BrowserRouter } from 'react-router-dom';
import { PageRouter } from './PageRouter';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PagesWithAttributes } from '../Utilities/Constants';
import HomeIcon from '@material-ui/icons/Home';
import * as Constants from '../Utilities/Constants';

configure({ adapter: new Adapter() });

describe('PageRouter Unit Testing', () => {
  //this test uses a mocked PagesWithAttributes in its test. Compare this to the test for DrawerItems.
  it('returns switch with routes for each page in PagesWithAttributes', async () => {
    Constants.PagesWithAttributes = [
      {
        name: 'Login',
        route: '/',
        icon: <HomeIcon />,
        component: <HomeIcon />,
      },
      {
        name: 'Test',
        route: '/test',
        icon: <HomeIcon />,
        component: <HomeIcon />,
      },
    ];
    const router = shallow(
      <BrowserRouter>
        <PageRouter />
      </BrowserRouter>,
    );
    const routes = router.props().children.type().props.children;
    expect(routes.length).toEqual(2);
    expect(routes).toMatchSnapshot();
  });
});
