import React from 'react';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Theme
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
import { tabs } from './Sidebar.constants';

interface Props {
  classes: Record<string, string>;
  open: boolean;
  handleDrawerClose: () => void;
  theme: Theme;
  handleClick: (link: string) => void;
}

export default (props: Props) => {
  const { classes, open, handleDrawerClose, handleClick, theme } = props;

  const emitClickedLink = (link: string) => {
    handleDrawerClose();
    handleClick(link);
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {tabs.slice(0, -2).map((tab, index) => (
          <ListItem
            button
            key={index}
            onClick={() => emitClickedLink(tab.link)}
          >
            <ListItemIcon>
              <Icon>{tab.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {tabs.slice(-2).map((tab, index) => (
          <ListItem
            button
            key={index}
            onClick={() => emitClickedLink(tab.link)}
          >
            <ListItemIcon>
              <Icon>{tab.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
