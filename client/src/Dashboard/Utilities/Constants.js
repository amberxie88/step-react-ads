import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import Reports from '../PageComponents/ReportsDashboard/ReportsDashboard';
import QueryResults from '../PageComponents/QueryDashboard/QueryResults';

const Title = 'KOALAS';
const PagesWithAttributes = [
  {
    name: 'Home',
    route: '/',
    icon: <HomeIcon />,
    component: <Reports />,
  },
  {
    name: 'Dashboard',
    route: '/Dashboard',
    icon: <DashboardIcon />,
    component: <Reports />,
  },
  {
    name: 'Queries',
    route: '/Query',
    icon: <BarChartIcon />,
    component: <QueryResults />,
  },
];
export { Title, PagesWithAttributes };
