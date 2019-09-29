import React, { ChangeEvent, FormEvent } from 'react';
import {
  DocumentReference,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Update.scss';
import { getBalances } from '../User.utils';
import { Program } from '../../Program';
import { UserBalances } from '../User.constants';

interface Props {
  balance: string;
  balancePoints: number;
  programs: Array<Program>;
  user: DocumentReference;
  usersRef: CollectionReference;
  setBalance: (id: string) => void;
  setBalancePoints: (points: number) => void;
  setBalances: (balances: UserBalances) => void;
}

export default (props: Props) => {
  const {
    programs,
    balance,
    balancePoints,
    user,
    usersRef,
    setBalance,
    setBalances,
    setBalancePoints
  } = props;

  const handlebalanceUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const userRef = usersRef.doc(user.id);
    userRef.set({ balances: { [balance]: balancePoints } }, { merge: true });
    const updatedUser = await userRef.get();
    getBalances(updatedUser, setBalances);
  };

  const handlebalanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBalance(event.target.value);
  };

  const handlebalancePointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalancePoints(+event.target.value);
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
      <select onChange={handlebalanceChange} value={balance} required>
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
        value={balancePoints}
        onChange={handlebalancePointsChange}
        required
      />
    </label>
  );

  return (
    <form onSubmit={handlebalanceUpdate}>
      <h3>Add a Point Balance</h3>
      {selectProgram}
      {selectBalance}
      <button type="submit">Submit</button>
    </form>
  );
};
