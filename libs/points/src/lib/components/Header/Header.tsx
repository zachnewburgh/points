import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  ButtonBase,
  Avatar,
  Button
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { CurrentUser } from '@points/shared-models';
import { History } from 'history';

interface Props {
  classes: Record<string, string>;
  handleDrawerOpen: () => void;
  open: boolean;
  handleLogin: () => void;
  currentUser: CurrentUser;
  history: History;
}

export default (props: Props) => {
  const {
    classes,
    handleDrawerOpen,
    open,
    handleLogin,
    currentUser,
    history
  } = props;

  const authButton = currentUser ? (
    <Tooltip title="Log Out">
      <ButtonBase onClick={handleLogin}>
        <Avatar alt="user profile" src={currentUser.photoURL} />
      </ButtonBase>
    </Tooltip>
  ) : (
    <Button color="inherit" onClick={handleLogin}>
      Log in
    </Button>
  );

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, {
            [classes.hide]: open
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push('/')}
        >
          Points
        </Typography>
        {authButton}
      </Toolbar>
    </AppBar>
  );
};
