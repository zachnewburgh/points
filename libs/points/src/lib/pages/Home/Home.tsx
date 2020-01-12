import { User } from '@points/shared-models';
import { ProgramsState } from '@points/shared-react-state';
import { CellValueChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BalancesTable } from '../../components/BalancesTable';
import { getUpdatedBalances } from '../../components/BalancesTable/BalancesTable.constants';
import { UserUpdate } from '../../models';
import './Home.scss';

interface Props extends RouteComponentProps {
  programs: ProgramsState;
  user: User;
  onBalanceUpdate: (ID: string, update: Partial<User>) => void;
}
export default (props: Props) => {
  const { programs = {} as ProgramsState, user, onBalanceUpdate } = props;
  const { balances, id } = user;
  const { ids, entities } = programs;

  const handleBalanceUpdate = (event: CellValueChangedEvent) => {
    const updatedBalances = getUpdatedBalances(balances, event);
    const update = { balances: updatedBalances };
    onBalanceUpdate(id, update);
  };

  return (
    <section className="home">
      <div className="add-balance">
        <UserUpdate
          programs={Object.values(entities)}
          user={user}
          updateUser={onBalanceUpdate}
        />
      </div>
      <div
        className="display-balances"
        style={{ width: '100%', height: '100%' }}
      >
        <BalancesTable
          balances={balances}
          programIDs={ids}
          programEntities={entities}
          onBalanceUpdate={handleBalanceUpdate}
        />
      </div>
    </section>
  );
};
