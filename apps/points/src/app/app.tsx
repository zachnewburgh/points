import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Grid,
  Avatar,
  Button,
  ButtonBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Icon
} from '@material-ui/core';

import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon
} from '@material-ui/icons';

import { useStyles } from './app.constants';

import * as firebaseUtils from '@points/firebase';
import {
  ProgramCreate,
  ProgramDelete,
  ProgramUpdate,
  ProgramRead,
  UserRead,
  UserUpdate,
  getBalances,
  getPrograms
} from '@points/points';

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

  const tabs = [
    { name: 'Flights', icon: 'flight_takeoff' },
    { name: 'Hotels', icon: 'hotel' },
    { name: 'My Account', icon: 'account_balance' }
  ];

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

  const header = (
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
        <Typography variant="h6" className={classes.title}>
          Points
        </Typography>
        {authButton}
      </Toolbar>
    </AppBar>
  );

  const drawer = (
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
        {tabs.slice(0, tabs.length - 1).map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon>{tab.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {tabs.slice(tabs.length - 1).map((tab, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <Icon>{tab.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={tab.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const loggedIn = currentUser && (
    <>
      <UserRead programs={programs} balances={balances} />

      <UserUpdate
        balance={balance}
        balancePoints={balancePoints}
        programs={programs}
        usersRef={usersRef}
        user={user}
        setBalance={setBalance}
        setBalances={setBalances}
        setBalancePoints={setBalancePoints}
      />

      {isAdmin && (
        <>
          <ProgramCreate
            programs={programs}
            program={program}
            programsRef={programsRef}
            getPrograms={getPrograms}
            setProgram={setProgram}
            setPrograms={setPrograms}
          />

          <ProgramUpdate
            from={from}
            programs={programs}
            to={to}
            fromRatio={fromRatio}
            toRatio={toRatio}
            programToEdit={programToEdit}
            setFrom={setFrom}
            setFromRatio={setFromRatio}
            setTo={setTo}
            setToRatio={setToRatio}
            programsRef={programsRef}
            getPrograms={getPrograms}
            setPrograms={setPrograms}
            setNewName={setNewName}
            newName={newName}
            setProgramToEdit={setProgramToEdit}
          />

          <ProgramDelete
            setProgramToDelete={setProgramToDelete}
            getPrograms={getPrograms}
            setPrograms={setPrograms}
            programsRef={programsRef}
            programs={programs}
            programToDelete={programToDelete}
          />
        </>
      )}

      <ProgramRead programs={programs} />
    </>
  );

  const loggedOut = <h1>Not logged in.</h1>;

  const content = (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <div className={classes.drawerHeader} />
      <Grid container>
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
