import { User } from '@points/shared-models';
import { ProgramEntities, ProgramsState } from '@points/shared-react-state';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BalancesTable } from '../../components/BalancesTable';
import './Home.scss';

interface Props extends RouteComponentProps {
  programs: ProgramsState;
  user: User;
}
export default (props: Props) => {
  const { programs = {} as ProgramsState, user } = props;
  const { balances } = user;
  const { ids, entities } = programs;

  return (
    <section className="home">
      <BalancesTable
        balances={balances}
        programIDs={ids}
        programEntities={entities}
      />
    </section>
  );
};
