import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { RouteNamesWithAttributes } from '../Utilities/Constants';

const mapRouteToListItems = (route) => {
  return (
    <ListItem button key={route.name} component={Link} to={'/' + route.name}>
      <ListItemIcon>{route.icon}</ListItemIcon>
      <ListItemText primary={route.name} />
    </ListItem>
  );
};

const generateListItems = () => {
  return RouteNamesWithAttributes.map(mapRouteToListItems);
};

export const DrawerItems = <div>{generateListItems()}</div>;
