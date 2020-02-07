import { ProgramPartnerRatios, UserBalances } from '@points/shared-models';
import { ProgramEntities } from '@points/shared-react-state';
import {
  CellValueChangedEvent,
  GridReadyEvent,
  ITooltipParams
} from 'ag-grid-community';
import { BaseWithValueColDefParams } from 'ag-grid-community/dist/lib/entities/colDef';

interface ProgramRow {
  name: string;
  current: number;
  transfer: number;
  total: number;
  partners?: string[];
}
interface ProgramRows {
  [id: string]: ProgramRow;
}

const addPartnersToRows = (
  baseName: string,
  basePoints: number,
  programsByID: ProgramEntities,
  ratiosByPartner: ProgramPartnerRatios
) => (rowsByID: ProgramRows, ID: string) => {
  const row = rowsByID[ID] || ({} as ProgramRow);
  const { current = 0, transfer: existingTransfer = 0, partners = [] } = row;
  const transferPoints = Math.floor(ratiosByPartner[ID] * basePoints);
  const transfer = existingTransfer + transferPoints;
  const total = current + transfer;
  const { name } = programsByID[ID];
  partners.push(`${baseName} (${numberWithCommas(basePoints)})`);
  const newRow = { ...row, ID, name, current, transfer, total, partners };
  return { ...rowsByID, [ID]: newRow };
};

const getRowsByIDWithPartners = (
  baseName: string,
  basePoints: number,
  programsByID: ProgramEntities,
  ratiosByID: ProgramPartnerRatios,
  rowsByID: ProgramRows
) => {
  const partnerIDs = Object.keys(ratiosByID);
  const addPartners = addPartnersToRows(
    baseName,
    basePoints,
    programsByID,
    ratiosByID
  );
  return partnerIDs.reduce(addPartners, rowsByID);
};

export const getRowsByID = (
  balancesByID: UserBalances,
  programsByID: ProgramEntities
) => (rowsByID: ProgramRows, ID: string) => {
  const current = balancesByID[ID];
  const { name, transferRatiosByPartner: ratiosByID } = programsByID[ID];
  const rowsByIDWithPartners = getRowsByIDWithPartners(
    name,
    current,
    programsByID,
    ratiosByID,
    rowsByID
  );
  const row = rowsByIDWithPartners[ID] || ({} as ProgramRow);
  const { transfer = 0 } = row;
  const total = current + transfer;
  const newRow = { ...row, ID, name, current, transfer, total };
  return { ...rowsByIDWithPartners, [ID]: newRow };
};

const numberWithCommas = (value: number) => {
  const numberUnits = /(\d)(?=(\d{3})+(?!\d))/g;
  const addComma = '$1,';
  return value.toString().replace(numberUnits, addComma);
};

const formatNumber = ({ value }: BaseWithValueColDefParams) => {
  return numberWithCommas(value);
};

enum GridSort {
  Alpha = 'asc',
  Reverse = 'desc'
}

enum GridColType {
  Number = 'numericColumn'
}

enum GridColFilter {
  Number = 'agNumberColumnFilter'
}

const totalTooltip = ({ data }: ITooltipParams) =>
  data.partners && `Transfers: ${data.partners.join(', ')}`;

export const columnDefs = [
  {
    headerName: 'Name',
    field: 'name',
    sort: GridSort.Alpha,
    valueFormatter: null,
    type: null,
    filter: null
  },
  {
    headerName: 'Current',
    field: 'current',
    editable: true
  },
  {
    headerName: 'Transfer',
    field: 'transfer'
  },
  {
    headerName: 'Total',
    field: 'total',
    tooltipValueGetter: totalTooltip
  }
];

export const defaultColDef = {
  sortable: true,
  filterParams: {
    resetButton: true
  },
  valueFormatter: formatNumber,
  type: GridColType.Number,
  filter: GridColFilter.Number,
  editable: true
};

export const onGridReady = ({ api }: GridReadyEvent) => api.sizeColumnsToFit();
export const getUpdatedBalances = (
  balances: UserBalances,
  event: CellValueChangedEvent
) => {
  const { data } = event;
  const { current, ID: programID } = data;
  const newBalances = { ...balances, [programID]: +current || 0 };
  if (!newBalances[programID]) delete newBalances[programID];
  return newBalances;
};
