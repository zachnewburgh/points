import { DocumentReference } from 'firebase/firebase-firestore';
import { UserBalances } from './User.constants';

export const getAccounts = async (
  user: DocumentReference,
  setAccounts: (balances: UserBalances) => void
) => {
  if (user) {
    setAccounts(user ? user.data().balances : {});
  }
};
