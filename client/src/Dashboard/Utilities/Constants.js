import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import Reports from '../PageComponents/ReportsDashboard/ReportsDashboard';
import QueryResults from '../PageComponents/QueryDashboard/QueryResults';

const Title = 'KOALAS';
const RouteNamesWithAttributes = [
  { name: 'Dashboard', icon: <DashboardIcon />, component: <Reports /> },
  { name: 'Queries', icon: <BarChartIcon />, component: <QueryResults /> },
];
const RouteNames = RouteNamesWithAttributes.map((route) => {
  return route.name;
});
export { Title, RouteNames, RouteNamesWithAttributes };
