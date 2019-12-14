import React, { useState } from 'react';
import './Read.scss';
import { UserBalances, Program } from '@points/shared-models';
import { Paper, Typography } from '@material-ui/core';
import { ProgramRead } from '../../Program';

interface Props {
  balances: UserBalances;
  programs: Program[];
}

interface ProgramsMap {
  [id: string]: Program;
}

interface PartnersMap {
  [id: string]: number;
}

export default (props: Props) => {
  const { balances: accounts, programs } = props;
  const [activeProgram, setActiveProgram] = useState(0);

  const convertProgramsToMap = (map: ProgramsMap, program) => ({
    ...map,
    [program.id]: program
  });
  const programsById = programs.reduce(convertProgramsToMap, {});

  const addPartnerPoints = (map: PartnersMap, id: string) => {
    const program = programsById[id];
    const ratios = program ? program.transferRatiosByPartner : {};
    Object.keys(ratios).forEach((partnerId: string) => {
      const points = Math.floor(ratios[partnerId] * accounts[id]);
      map[partnerId] = map[partnerId] === undefined ? 0 : map[partnerId];
      map[partnerId] += points;
    });
    return map;
  };
  const partners = Object.keys(accounts).reduce(addPartnerPoints, {});

  const sortByName = (
    { name: first }: ProgramDetails,
    { name: second }: ProgramDetails
  ) => (first > second ? 1 : first < second ? -1 : 0);

  interface ProgramDetails {
    name: string;
    balance: number;
    isPartner: boolean;
  }

  const buildCard = (
    { name, balance, isPartner }: ProgramDetails,
    index: number
  ) => (
    <div className="account__card__container" key={index}>
      <Paper
        className={`account${
          activeProgram === index ? ' active-account' : ' inactive-account'
        }`}
        onClick={() => setActiveProgram(index)}
      >
        <Typography
          variant="h6"
          component="h6"
          className="account__details__name"
          noWrap={true}
        >
          {name}
        </Typography>
        <div className="account__details">
          <Typography component="p">{balance}</Typography>
          <Typography component="p" className="account__details__type">
            {isPartner ? 'partner' : 'account'}
          </Typography>
        </div>
      </Paper>
      {activeProgram !== index ? (
        ''
      ) : (
        <ProgramRead
          name={name}
          className="account details-card"
          handleClick={() => setActiveProgram(index)}
        />
      )}
    </div>
  );

  const getProgramDetails = (id: string, balance: number) => {
    const program = programsById[id];
    const programName = program && program.name;
    return {
      name: programName,
      balance: balance,
      isPartner: true
    };
  };

  const accountBalances = Object.keys(accounts)
    .map((id: string) => getProgramDetails(id, accounts[id]))
    .sort(sortByName);

  const partnerBalances = Object.keys(partners)
    .map((id: string) => getProgramDetails(id, partners[id]))
    .sort(sortByName);

  const balances = [...accountBalances, ...partnerBalances];
  const cards = balances.map(buildCard);
  const info = (
    <ProgramRead
      name={balances[activeProgram] && balances[activeProgram].name}
      className="account-info__card"
    />
  );

  return (
    <section className="my-account">
      <aside className="accounts">{cards}</aside>
      <div className="account-info">{info}</div>
    </section>
  );
};
