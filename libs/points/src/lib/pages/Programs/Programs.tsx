import React from 'react';
import { UserRead, UserUpdate, Program, UserBalances } from '../../models';
import {
  DocumentReference,
  CollectionReference
} from 'firebase/firebase-firestore';

interface Props {
  programs: Array<Program>;
  balances: UserBalances;
  balance: string;
  balancePoints: number;
  user: DocumentReference;
  usersRef: CollectionReference;
  setBalance: (id: string) => void;
  setBalancePoints: (points: number) => void;
  setBalances: (balances: UserBalances) => void;
}

export default (props: Props) => {
  const {
    programs,
    balances,
    balance,
    balancePoints,
    usersRef,
    user,
    setBalance,
    setBalances,
    setBalancePoints
  } = props;

  return (
    <section className="programs">
      <UserRead programs={programs} balances={balances} />

      <UserUpdate
        balance={balance}
        balancePoints={balancePoints}
        programs={programs}
        usersRef={usersRef}
        user={user}
        setBalance={setBalance}
        setBalances={setBalances}
        setBalancePoints={setBalancePoints}
      />
    </section>
  );
};
