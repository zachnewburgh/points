export enum SearchActionTypes {
  SetDeparting = '[SEARCH] Set Departing Airport',
  SetArriving = '[SEARCH] Set Arriving Airport'
}

interface setDepartingAction {
  type: SearchActionTypes.SetDeparting;
  payload: string;
}

interface setArrivingAction {
  type: SearchActionTypes.SetArriving;
  payload: string;
}

export type SearchActionType = setDepartingAction | setArrivingAction;
