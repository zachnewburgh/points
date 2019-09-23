import React, { ChangeEvent, FormEvent } from 'react';
import {
  DocumentReference,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Update.scss';
import { getAccounts } from '../User.utils';
import { Program } from '../../Program';
import { UserBalances } from '../User.constants';

interface Props {
  account: string;
  accountPoints: number;
  programs: Array<Program>;
  user: DocumentReference;
  usersRef: CollectionReference;
  setAccount: (id: string) => void;
  setAccountPoints: (points: number) => void;
  setAccounts: (balances: UserBalances) => void;
}

export default (props: Props) => {
  const {
    programs,
    account,
    accountPoints,
    user,
    usersRef,
    setAccount,
    setAccounts,
    setAccountPoints
  } = props;

  const handleAccountUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const userRef = usersRef.doc(user.id);
    userRef.set({ balances: { [account]: accountPoints } }, { merge: true });
    const updatedUser = await userRef.get();
    getAccounts(updatedUser, setAccounts);
  };

  const handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAccount(event.target.value);
  };

  const handleAccountPointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountPoints(+event.target.value);
  };

  const programOptions = programs.map(ref => {
    const { name } = ref.data();
    return (
      <option value={ref.id} key={ref.id}>
        {name}
      </option>
    );
  });

  const selectProgram = (
    <label>
      Program
      <select onChange={handleAccountChange} value={account} required>
        <option value="" disabled>
          ---
        </option>
        {programOptions}
      </select>
    </label>
  );

  const selectBalance = (
    <label>
      Balance
      <input
        type="number"
        step="1"
        value={accountPoints}
        onChange={handleAccountPointsChange}
        required
      />
    </label>
  );

  return (
    <form onSubmit={handleAccountUpdate}>
      <h3>Add a Point Balance</h3>
      {selectProgram}
      {selectBalance}
      <button type="submit">Submit</button>
    </form>
  );
};
