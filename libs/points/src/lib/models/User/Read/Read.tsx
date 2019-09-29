import React from 'react';

import './Read.scss';
import { UserBalances, CurrentUser } from '../User.constants';
import { Program } from '../../Program';

interface Props {
  balances: UserBalances;
  programs: Array<Program>;
}

export default (props: Props) => {
  const { balances, programs } = props;

  const balanceList = Object.keys(balances).map((programId: string) => {
    const program = programs.find(({ id }: Program) => id === programId);
    const programName = program && program.data().name;

    return (
      <li key={programId}>
        {programName}: {balances[programId]}
      </li>
    );
  });

  return (
    <>
      <ul>{balanceList}</ul>
    </>
  );
};
