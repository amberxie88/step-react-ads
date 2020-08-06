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
import AppBarWithDrawer from './AppBarWithDrawer';
React.useLayoutEffect = React.useEffect; // Necessary to supress warning during tests. The tests use server side rendering which doesn't support useLayoutEffect.
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

configure({ adapter: new Adapter() });

describe('AppBarWithDrawer Unit Testing', () => {
  it('AppBarWithDrawer opens drawer with button', async () => {
    const component = mount(
      <BrowserRouter>
        <AppBarWithDrawer />
      </BrowserRouter>,
    );

    const closeButton = component
      .find(IconButton)
      .filterWhere(
        (btn) =>
          btn.prop('onClick') !== undefined &&
          btn.prop('onClick').name == 'handleDrawerClose',
      );

    const before = component.html();
    closeButton.simulate('click');
    const after = component.html();
    expect(before).toMatchSnapshot();
    expect(after).toMatchSnapshot();
    expect(before).not.toBe(after);
  });

  it('AppBarWithDrawer opens drawer with button', async () => {
    const component = mount(
      <BrowserRouter>
        <AppBarWithDrawer />
      </BrowserRouter>,
    );

    const closeButton = component
      .find(IconButton)
      .filterWhere(
        (btn) =>
          btn.prop('onClick') !== undefined &&
          btn.prop('onClick').name == 'handleDrawerClose',
      );

    const openButton = component
      .find(IconButton)
      .filterWhere(
        (btn) =>
          btn.prop('onClick') !== undefined &&
          btn.prop('onClick').name == 'handleDrawerOpen',
      );

    closeButton.simulate('click');
    const before = component.html();
    openButton.simulate('click');
    const after = component.html();
    expect(before).toMatchSnapshot();
    expect(after).toMatchSnapshot();
    expect(before).not.toBe(after);
  });
});
