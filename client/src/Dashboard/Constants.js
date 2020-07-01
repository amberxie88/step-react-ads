import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';

const Title = 'KOALAS';
const RouteNamesWithAttributes = [
  { name: 'Dashboard', icon: <DashboardIcon /> },
  { name: 'Queries', icon: <BarChartIcon /> },
];
const RouteNames = RouteNamesWithAttributes.map((route) => {
  return route.name;
});
export { Title, RouteNames, RouteNamesWithAttributes };
