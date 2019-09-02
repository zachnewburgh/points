import 'firebase/auth';
import 'firebase/firestore';
import * as firebaseUtils from '@points/firebase';
import React, { useState } from 'react';
import './app.scss';

firebaseUtils.init();

export const App = () => { 
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  firebaseUtils.authChanged(setCurrentUser, setIsLoading);

  const handleLogin = () => {
    currentUser ? firebaseUtils.logout(setCurrentUser) : firebaseUtils.login(setCurrentUser);
  }

  return (
    !isLoading && <>
      <button onClick={handleLogin}>
        {currentUser ? 'Logout' : 'Login'}
      </button>
      <h1>{currentUser ? `Welcome, ${currentUser.displayName}!` : 'Not logged in.'}</h1>
      {currentUser && <img src={currentUser.photoURL} />}
    </>
  );
};

export default App;


