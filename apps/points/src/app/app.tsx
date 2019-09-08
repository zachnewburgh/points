import * as firebaseUtils from '@points/firebase';
import React, { useState, useEffect } from 'react';
import './app.scss';
import {
  ProgramCreate,
  ProgramDelete,
  ProgramUpdate,
  ProgramRead
} from '@points/points';

firebaseUtils.init();

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  const db = firebaseUtils.initFirestore();
  const programsRef = db.collection('programs');

  const getPrograms = async () => {
    const programs = await programsRef.orderBy('name').get();
    setPrograms(programs.docs);
  };

  useEffect(() => {
    firebaseUtils.authChanged(setCurrentUser, setIsLoading);
    getPrograms();
  }, []);

  const handleLogin = () => {
    currentUser
      ? firebaseUtils.logout(setCurrentUser)
      : firebaseUtils.login(setCurrentUser);
  };

  return (
    !isLoading && (
      <>
        <button onClick={handleLogin}>
          {currentUser ? 'Logout' : 'Login'}
        </button>
        <h1>
          {currentUser
            ? `Welcome, ${currentUser.displayName}!`
            : 'Not logged in.'}
        </h1>
        {currentUser && <img src={currentUser.photoURL} />}

        <ProgramCreate
          programs={programs}
          program={program}
          programsRef={programsRef}
          getPrograms={getPrograms}
          setProgram={setProgram}
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
          setNewName={setNewName}
          newName={newName}
          setProgramToEdit={setProgramToEdit}
        />

        <ProgramDelete
          setProgramToDelete={setProgramToDelete}
          getPrograms={getPrograms}
          programsRef={programsRef}
          programs={programs}
          programToDelete={programToDelete}
        />

        <ProgramRead programs={programs} />
      </>
    )
  );
};

export default App;
