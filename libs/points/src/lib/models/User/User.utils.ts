import { DocumentReference } from 'firebase/firebase-firestore';
import { UserBalances } from '@points/shared-models';

export const getBalances = async (
  user: DocumentReference,
  setBalances: (balances: UserBalances) => void
) => {
  if (user) {
    setBalances(user ? user.data().balances : {});
  }
};
