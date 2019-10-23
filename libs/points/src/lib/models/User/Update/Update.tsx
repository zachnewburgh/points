import React, { ChangeEvent, FormEvent } from 'react';
import {
  DocumentReference,
  CollectionReference
} from 'firebase/firebase-firestore';

import './Update.scss';
import { getBalances } from '../User.utils';
import { UserBalances, Program } from '@points/shared-models';
import { PrimaryButton, TextInput, Select } from '@points/shared-react-ui';

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

  const handleBalanceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setBalance(event.target.value);
  };

  const handlebalancePointsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBalancePoints(+event.target.value);
  };

  const programOptions = programs.map(ref => {
    const { name } = ref.data();
    return { value: ref.id, label: name };
  });

  const selectProgram = (
    <Select
      id="edit-program-from"
      label="From"
      helperText="From"
      handleOnChange={handleBalanceChange}
      value={balance}
      options={programOptions}
    />
  );

  const selectBalance = (
    <TextInput
      id="program-balance"
      label="Program Balance"
      helperText="Program Balance"
      value={balancePoints}
      handleOnChange={handlebalancePointsChange}
    />
  );

  return (
    <form onSubmit={handlebalanceUpdate}>
      <h3>Add a Point Balance</h3>
      {selectProgram}
      {selectBalance}
      <PrimaryButton type="submit" />
    </form>
  );
};
