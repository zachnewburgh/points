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

  interface ProgramsMap {
    [id: string]: Program;
  }
  const convertProgramsToMap = (map: ProgramsMap, program) => ({
    ...map,
    [program.id]: program
  });
  const programsById = programs.reduce(convertProgramsToMap, {});

  interface TransfersMap {
    [id: string]: number;
  }
  const calculateTransferPoints = (map: TransfersMap, id: string) => {
    const program = programsById[id];
    const transferPartners = program
      ? program.data().transferRatiosByPartner
      : {};
    Object.keys(transferPartners).forEach(partnerId => {
      if (map[partnerId] === undefined) {
        map[partnerId] = Math.floor(transferPartners[partnerId] * balances[id]);
      } else {
        map[partnerId] += Math.floor(
          transferPartners[partnerId] * balances[id]
        );
      }
    });
    return map;
  };
  const transfers = Object.keys(balances).reduce(calculateTransferPoints, {});

  const balanceList = Object.keys(balances).map(
    (programId: string, index: number) => {
      const program = programsById[programId];
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

  const transferList = Object.keys(transfers).map(
    (programId: string, index: number) => {
      const program = programsById[programId];
      const programName = program && program.data().name;

      return (
        <Paper className="balance" key={index}>
          <Typography variant="h5" component="h3">
            {programName}
          </Typography>
          <Typography component="p">{transfers[programId]}</Typography>
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
      <Typography variant="h4" component="h4">
        Transfers
      </Typography>
      <div className="balances">{transferList}</div>
    </section>
  );
};
