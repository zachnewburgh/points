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
  const [account, setAccount] = useState('');
  const [accountPoints, setAccountPoints] = useState(0);
  const [accounts, setAccounts] = useState({});

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
      getAccounts(user, setAccounts);
    }
  }, [user]);

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
        usersRef={usersRef}
        user={user}
        setAccount={setAccount}
        setAccounts={setAccounts}
        setAccountPoints={setAccountPoints}
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

  const loggedOut = (
    <>
      <button onClick={handleLogin}>Log in</button>
      <h1>Not logged in.</h1>
    </>
  );

  return currentUser ? loggedIn : loggedOut;
};

export default App;
