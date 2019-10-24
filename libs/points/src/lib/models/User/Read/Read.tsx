import React from 'react';

import './Read.scss';
import { UserBalances, Program } from '@points/shared-models';
import { Paper, Typography } from '@material-ui/core';

interface Props {
  balances: UserBalances;
  programs: Array<Program>;
}

export default (props: Props) => {
  const { balances, programs } = props;

  const balanceList = Object.keys(balances).map(
    (programId: string, index: number) => {
      const program = programs.find(({ id }: Program) => id === programId);
      const programName = program && program.data().name;

      return (
        <Paper className="balance" key={index}>
          <Typography variant="h5" component="h3">
            {programName}
          </Typography>
          <Typography component="p">{balances[programId]}</Typography>
        </Paper>
      );
    }
  );

  return (
    <section className="my-account">
      <Typography variant="h4" component="h4">
        Balances
      </Typography>
      <div className="balances">{balanceList}</div>
    </section>
  );
};
