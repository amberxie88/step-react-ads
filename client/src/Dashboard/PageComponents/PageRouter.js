import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PagesWithAttributes } from '../Utilities/Constants';

const mapPageToRouteAndComponent = (page) => {
  return (
    <Route exact path={page.route}>
      {page.component}
    </Route>
  );
};

const generateRoutes = () => {
  return PagesWithAttributes.map(mapPageToRouteAndComponent);
};

const PageRouter = () => {
  console.log(generateRoutes());
  return <Switch>{generateRoutes()}</Switch>;
};

export { PageRouter };
