import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid } from '@material-ui/core';
import { useStyles } from './App.constants';
import {
  Home,
  Admin,
  Header,
  Sidebar,
  HomeContainer,
  AdminContainer,
  ProgramsContainer
} from '@points/points';
import './app.scss';
import { Router, Switch, Route } from 'react-router-dom';
import { User } from '@points/shared-models';
import history from '../history';

interface Props {
  user: User;
  isReady: boolean;
  initializeFirebase: () => void;
  login: () => void;
  logout: () => void;
  getPrograms: () => void;
}

export default (props: Props) => {
  const {
    initializeFirebase,
    isReady,
    login,
    logout,
    user,
    getPrograms
  } = props;

  useEffect(() => {
    if (isReady) getPrograms();
  }, [isReady]);

  useEffect(() => {
    initializeFirebase();
  }, [initializeFirebase]);

  const classes = useStyles({});
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    user ? logout() : login();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const header = (
    <Header
      classes={classes}
      handleDrawerOpen={handleDrawerOpen}
      handleLogin={handleLogin}
      user={user}
      open={open}
      history={history}
    />
  );

  const drawer = (
    <Sidebar
      classes={classes}
      open={open}
      handleDrawerClose={handleDrawerClose}
      handleClick={history.push}
      theme={theme}
    />
  );

  const admin = <AdminContainer />;

  const loggedIn = user && (
    <Router history={history}>
      <Switch>
        <Route path="/admin">{user.isAdmin ? admin : 'Restricted'}</Route>
        <Route path="/programs" component={ProgramsContainer} />
        <Route path="/" component={HomeContainer} />
      </Switch>
    </Router>
  );

  const loggedOut = <h1>Not logged in.</h1>;

  const content = (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid className={classes.gridContainer} container>
        <Grid item xs={12}>
          {user ? loggedIn : loggedOut}
        </Grid>
      </Grid>
    </main>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {header}
      {drawer}
      {content}
    </div>
  );
};
