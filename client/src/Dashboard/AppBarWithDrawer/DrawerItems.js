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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { PagesWithAttributes } from '../Utilities/Constants';

const mapPageToListItem = (page) => {
  return (
    <ListItem button key={page.name} component={Link} to={page.route}>
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText primary={page.name} />
    </ListItem>
  );
};

const generateListItems = () => {
  return PagesWithAttributes.map(mapPageToListItem);
};

export const DrawerItems = <div>{generateListItems()}</div>;
