import {
  SearchActionType as ActionType,
  SearchActionTypes as ActionTypes
} from '../types';
import { SearchState } from '../interfaces';

const searchInitialState = { arriving: null, departing: null };

export default (
  search: SearchState = searchInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypes.SetArriving:
      return { ...search, arriving: action.payload };
    case ActionTypes.SetDeparting:
      return { ...search, departing: action.payload };
    default:
      return search;
  }
};
