import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import Reports from '../PageComponents/ReportsDashboard/ReportsDashboard';
import Queries from '../PageComponents/QueryDashboard/QueryDashboard';
import Login from '../PageComponents/LoginDashboard/LoginDashboard';

const Title = 'Google Ads API Web App Demo';
const PagesWithAttributes = [
  {
    name: 'Login',
    route: '/',
    icon: <HomeIcon />,
    component: <Login />,
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
    component: <Queries />,
  },
];
export { Title, PagesWithAttributes };
