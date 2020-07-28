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
import { Switch, Route } from 'react-router-dom';
import { PagesWithAttributes } from '../Utilities/Constants';

const mapPageToRouteAndComponent = (page, tutorial, handleJoyrideCallback) => {
  return (
    <Route exact path={page.route}>
      {<page.component runTutorial={tutorial} handleJoyrideCallback={handleJoyrideCallback}/>}
    </Route>
  );
};

const generateRoutes = (tutorial, handleJoyrideCallback) => {
  return PagesWithAttributes.map((page) => mapPageToRouteAndComponent(page, tutorial, handleJoyrideCallback));
};


const PageRouter = (props) => {
  return <Switch>{generateRoutes(props.tutorial, props.handleJoyrideCallback)}</Switch>;
};

export { PageRouter };
