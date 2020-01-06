import { UserBalances } from '@points/shared-models';
import { ProgramEntities } from '@points/shared-react-state';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import {
  columnDefs,
  defaultColDef,
  getRowsByID,
  onGridReady
} from './BalancesTable.constants';

interface Props {
  programs: ProgramEntities;
  balances: UserBalances;
}

export default (props: Props) => {
  const { balances, programs } = props;

  const rowsByID = Object.keys(balances).reduce(
    getRowsByID(balances, programs),
    {}
  );
  const rowData = Object.values(rowsByID);

  return (
    <div
      className="ag-theme-material"
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        suppressMenuHide
        suppressMovableColumns
        alwaysShowVerticalScroll
        multiSortKey="ctrl"
      />
    </div>
  );
};
