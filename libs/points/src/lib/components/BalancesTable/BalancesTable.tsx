import { UserBalances } from '@points/shared-models';
import { ProgramEntities } from '@points/shared-react-state';
import { CellValueChangedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import {
  columnDefs,
  defaultColDef,
  getRowsByID,
  onGridReady
} from './BalancesTable.constants';

interface Props {
  programIDs: string[];
  programEntities: ProgramEntities;
  balances: UserBalances;
  onBalanceUpdate: (event: CellValueChangedEvent) => void;
}

export default (props: Props) => {
  const { balances, programIDs, programEntities, onBalanceUpdate } = props;

  let rowsByID = {};
  if (programIDs.length) {
    const balanceIDs = Object.keys(balances);
    rowsByID = balanceIDs.reduce(getRowsByID(balances, programEntities), {});
  }
  const rowData = Object.values(rowsByID);

  const fullSize = {
    height: '100%',
    width: '100%'
  };

  const handleBalanceUpdate = onBalanceUpdate;

  return (
    <div className="ag-theme-material full-size" style={fullSize}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        suppressMenuHide
        suppressMovableColumns
        alwaysShowVerticalScroll
        multiSortKey="ctrl"
        onCellValueChanged={handleBalanceUpdate}
      />
    </div>
  );
};
