import { CollectionReference } from 'firebase/firebase-firestore';
import { UserBalances, CurrentUser } from './User.constants';

export const getAccounts = async (
  currentUser: CurrentUser,
  usersRef: CollectionReference,
  setAccounts: (balances: UserBalances) => void
) => {
  if (currentUser) {
    const users = await usersRef.get();
    const user = users.docs.find(({ id }) => currentUser.uid === id);
    setAccounts(user.data().balances);
  }
};
