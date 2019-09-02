import * as firebase from 'firebase/app';
import { config } from './secrets';

export const init = () => firebase.initializeApp(config);

export const authChanged = (setCurrentUser: (user: User) => void, setIsLoading: (isLoading: boolean) => void) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user)
    }
    setIsLoading(false);
  });
}

interface User {
  displayName: string;
  email: string;
  photoURL: string;
}

export const login = async (setCurrentUser: (user: User) => void) => {
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

export const logout = async (setCurrentUser: (user: User) => void) => {
  try {
    await firebase.auth().signOut();
    setCurrentUser(null);
  } catch (error) {
    console.log(error);
  }
};