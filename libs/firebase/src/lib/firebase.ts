import { auth, initializeApp } from 'firebase/app';
import { firestore } from 'firebase';
import { config } from './secrets';

export const init = () => initializeApp(config);
export const initFirestore = () => firestore();

export const login = async () => {
  const provider = new auth.GoogleAuthProvider();
  try {
    await auth().setPersistence(auth.Auth.Persistence.LOCAL);
    const result = await auth().signInWithPopup(provider);
    const { displayName, email, photoURL, uid: id } = result.user;
    const db = initFirestore();
    const user = await db
      .collection('users')
      .doc(id)
      .get();
    const { balances, role } = user.data();
    const isAdmin = role === 'admin';
    return { id, displayName, email, photoURL, isAdmin, balances };
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    await auth().signOut();
    return null;
  } catch (error) {
    throw new Error(error);
  }
};
