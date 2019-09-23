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
  getAccounts,
  getPrograms
} from '@points/points';

firebaseUtils.init();

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [program, setProgram] = useState('');
  const [programs, setPrograms] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromRatio, setFromRatio] = useState(1.0);
  const [toRatio, setToRatio] = useState(1.0);
  const [programToDelete, setProgramToDelete] = useState('');
  const [programToEdit, setProgramToEdit] = useState('');
  const [newName, setNewName] = useState('');
  const [account, setAccount] = useState('');
  const [accountPoints, setAccountPoints] = useState(0);
  const [accounts, setAccounts] = useState({});

  const db = firebaseUtils.initFirestore();
  const programsRef = db.collection('programs');
  const usersRef = db.collection('users');

  useEffect(() => {
    firebaseUtils.authChanged(setCurrentUser);
  }, []);

  useEffect(() => {
    if (currentUser) {
      getPrograms(programsRef, setPrograms);
      getAccounts(currentUser, usersRef, setAccounts);
    }
  }, [currentUser]);

  const handleLogin = () => {
    currentUser
      ? firebaseUtils.logout(setCurrentUser)
      : firebaseUtils.login(setCurrentUser);
  };

  const loggedIn = currentUser && (
    <>
      <button onClick={handleLogin}>Log out</button>
      <UserRead
        programs={programs}
        accounts={accounts}
        currentUser={currentUser}
      />

      <UserUpdate
        account={account}
        accountPoints={accountPoints}
        programs={programs}
        currentUser={currentUser}
        usersRef={usersRef}
        setAccount={setAccount}
        setAccounts={setAccounts}
        setAccountPoints={setAccountPoints}
      />

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

      <ProgramRead programs={programs} />
    </>
  );

  const loggedOut = (
    <>
      <button onClick={handleLogin}>Log in</button>
      <h1>Not logged in.</h1>
    </>
  );

  return currentUser ? loggedIn : loggedOut;
};

export default App;
