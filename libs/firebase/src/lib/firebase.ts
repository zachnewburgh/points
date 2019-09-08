import { auth, initializeApp } from 'firebase/app';
import { firestore } from 'firebase';
import { config } from './secrets';

export const init = () => initializeApp(config);
export const initFirestore = () => firestore();

export const authChanged = (setCurrentUser: (user: User) => void) => {
  auth().onAuthStateChanged(user => {
    setCurrentUser(user);
  });
};

interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

export const login = async (setCurrentUser: (user: User) => void) => {
  const provider = new auth.GoogleAuthProvider();
  try {
    await auth().setPersistence(auth.Auth.Persistence.LOCAL);
    const result = await auth().signInWithPopup(provider);
    const { displayName, email, photoURL } = result.user;
    const user = { displayName, email, photoURL };
    setCurrentUser(user);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (setCurrentUser: (user: User) => void) => {
  try {
    await auth().signOut();
    setCurrentUser(null);
  } catch (error) {
    console.log(error);
  }
};
