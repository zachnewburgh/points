import { User } from '@points/shared-models';
import { ProgramEntities, ProgramsState } from '@points/shared-react-state';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BalancesTable } from '../../components/BalancesTable';
import './Home.scss';

interface Props extends RouteComponentProps {
  programs: { ids: string[]; entities: ProgramEntities };
  user: User;
}

interface Airport {
  name: string;
  code: string;
}

export default (props: Props) => {
  const { programs = {} as ProgramsState, user } = props;
  const { balances } = user;
  const { ids, entities } = programs;

  let table: JSX.Element;
  if (ids.length) {
    table = <BalancesTable balances={balances} programs={entities} />;
  }

  return <section className="home">{table}</section>;
};
