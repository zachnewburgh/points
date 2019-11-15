export enum SearchActionTypes {
  SetDeparting = '[SEARCH] Set Departing Airport',
  SetArriving = '[SEARCH] Set Arriving Airport',
  SetProgram = '[SEARCH] Set Program'
}

interface setDepartingAction {
  type: SearchActionTypes.SetDeparting;
  payload: string;
}

interface setArrivingAction {
  type: SearchActionTypes.SetArriving;
  payload: string;
}

interface setProgramAction {
  type: SearchActionTypes.SetProgram;
  payload: string;
}

export type SearchActionType =
  | setDepartingAction
  | setArrivingAction
  | setProgramAction;
