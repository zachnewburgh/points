import * as firebaseUtils from '@points/firebase';
import React, { useState, useEffect } from 'react';
import './app.scss';
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

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
  Avatar,
  Tooltip,
  ButtonBase
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useStyles } from './app.constants';

firebaseUtils.init();

export const App = () => {
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

  const classes = useStyles({});

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
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
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

  return (
    <>
      {header}
      <Grid className="app__content-container" container>
        <Grid item xs={12}>
          {currentUser ? loggedIn : loggedOut}
        </Grid>
      </Grid>
    </>
  );
};

export default App;
