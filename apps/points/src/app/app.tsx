import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '@points/firebase';
import React, { useState } from 'react';
import './app.scss';

firebase.initializeApp(firebaseConfig);

interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

export const App = () => { 
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
    }
    setIsLoading(false);
  });

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const result = await firebase.auth().signInWithPopup(provider);
      const { displayName, email, photoURL } = result.user;
      const user = { displayName, email, photoURL };
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    currentUser ? logout() : login();
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


