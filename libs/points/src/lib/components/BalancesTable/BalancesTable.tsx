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
  programIDs: string[];
  programEntities: ProgramEntities;
  balances: UserBalances;
}

export default (props: Props) => {
  const { balances, programIDs, programEntities } = props;

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
      />
    </div>
  );
};
