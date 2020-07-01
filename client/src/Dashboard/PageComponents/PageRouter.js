import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Reports from './ReportsDashboard/ReportsDashboard';
import QueryResults from './QueryDashboard/QueryResults';
import { RouteNamesWithAttributes } from '../Utilities/Constants';

const mapRouteNamesWithAttributesToRoutesAndComponents = (route) => {
  return <Route path={'/' + route.name}>{route.component}</Route>;
};

const generateRoutes = () => {
  return RouteNamesWithAttributes.map(
    mapRouteNamesWithAttributesToRoutesAndComponents,
  );
};

const PageRouter = () => {
  return <Switch>{generateRoutes()}</Switch>;
};

export { PageRouter };
