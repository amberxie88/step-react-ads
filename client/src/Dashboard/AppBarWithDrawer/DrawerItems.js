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
