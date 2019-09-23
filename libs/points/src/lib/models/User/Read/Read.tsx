import React from 'react';

import './Read.scss';
import { UserBalances, CurrentUser } from '../User.constants';
import { Program } from '../../Program';

interface Props {
  currentUser: CurrentUser;
  accounts: UserBalances;
  programs: Array<Program>;
}

export default (props: Props) => {
  const { currentUser, accounts, programs } = props;

  const balances = Object.keys(accounts).map((accountId: string) => {
    const account = programs.find(({ id }: Program) => id === accountId);
    const accountName = account && account.data().name;

    return (
      <li key={accountId}>
        {accountName}: {accounts[accountId]}
      </li>
    );
  });

  return (
    <>
      <h1>Welcome, {currentUser.displayName}!</h1>
      <img src={currentUser.photoURL} />
      <ul>{balances}</ul>
    </>
  );
};
