import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { CssBaseline, Grid } from '@material-ui/core';
import { useStyles } from './app.constants';
import * as firebaseUtils from '@points/firebase';
import {
  ProgramRead,
  getBalances,
  getPrograms,
  Home,
  Admin,
  Programs,
  Header,
  Sidebar
} from '@points/points';
import './app.scss';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

firebaseUtils.init();

export default () => {
  const classes = useStyles({});
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [program, setProgram] = useState('');
  const [programs, setPrograms] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromRatio, setFromRatio] = useState(1.0);
  const [toRatio, setToRatio] = useState(1.0);
  const [programToDelete, setProgramToDelete] = useState('');
  const [programToEdit, setProgramToEdit] = useState('');
  const [newName, setNewName] = useState('');
  const [balance, setBalance] = useState('');
  const [balancePoints, setBalancePoints] = useState(0);
  const [balances, setBalances] = useState({});

  const db = firebaseUtils.initFirestore();
  const programsRef = db.collection('programs');
  const usersRef = db.collection('users');

  useEffect(() => {
    firebaseUtils.authChanged(setCurrentUser);
  }, []);

  const getUser = async () => {
    const userToSet = await usersRef.doc(currentUser.uid).get();
    setUser(userToSet);
  };

  useEffect(() => {
    if (currentUser) {
      getUser();
    }
  }, [currentUser]);

  const getAdmin = async () => {
    setIsAdmin(!!user && user.data().role === 'admin');
  };

  useEffect(() => {
    if (user) {
      getAdmin();
      getPrograms(programsRef, setPrograms);
      getBalances(user, setBalances);
    }
  }, [user]);

  const handleLogin = () => {
    currentUser
      ? firebaseUtils.logout(setCurrentUser)
      : firebaseUtils.login(setCurrentUser);
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
      currentUser={currentUser}
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

  const admin = (
    <Admin
      programs={programs}
      program={program}
      programsRef={programsRef}
      getPrograms={getPrograms}
      setPrograms={setPrograms}
      setProgram={setProgram}
      from={from}
      to={to}
      fromRatio={fromRatio}
      toRatio={toRatio}
      programToEdit={programToEdit}
      setFrom={setFrom}
      setTo={setTo}
      setFromRatio={setFromRatio}
      setToRatio={setToRatio}
      setNewName={setNewName}
      newName={newName}
      setProgramToEdit={setProgramToEdit}
      setProgramToDelete={setProgramToDelete}
      programToDelete={programToDelete}
    />
  );

  const loggedIn = currentUser && (
    <Router history={history}>
      <Switch>
        <Route path="/trips">Trips</Route>
        <Route path="/blog">Blog</Route>
        <Route path="/cards">Cards</Route>
        <Route path="/account">Account</Route>
        <Route path="/admin">{isAdmin ? admin : 'Restricted'}</Route>
        <Route path="/programs">
          <>
            <Programs
              programs={programs}
              balances={balances}
              balance={balance}
              balancePoints={balancePoints}
              usersRef={usersRef}
              user={user}
              setBalance={setBalance}
              setBalances={setBalances}
              setBalancePoints={setBalancePoints}
            />
          </>
        </Route>
        <Route path="/">
          <Home history={history} />
        </Route>
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
      <Grid className="grid__container" container>
        <Grid item xs={12}>
          {currentUser ? loggedIn : loggedOut}
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
