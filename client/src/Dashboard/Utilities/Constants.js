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
