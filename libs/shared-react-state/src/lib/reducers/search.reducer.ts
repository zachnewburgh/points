import {
  SearchActionType as ActionType,
  SearchActionTypes as ActionTypes
} from '../types';
import { SearchState } from '../interfaces';

const searchInitialState = { arriving: null, departing: null, program: null };

export default (
  search: SearchState = searchInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypes.SetArriving:
      return { ...search, arriving: action.payload, program: null };
    case ActionTypes.SetDeparting:
      return { ...search, departing: action.payload, program: null };
    case ActionTypes.SetProgram:
      return { ...search, program: action.payload };
    default:
      return search;
  }
};
