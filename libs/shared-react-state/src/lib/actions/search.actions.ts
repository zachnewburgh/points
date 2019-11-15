import {
  SearchActionType as ActionType,
  SearchActionTypes as ActionTypes
} from '../types';

export default {
  setArriving: (airportName: string): ActionType => ({
    type: ActionTypes.SetArriving,
    payload: airportName
  }),
  setDeparting: (airportName: string): ActionType => ({
    type: ActionTypes.SetDeparting,
    payload: airportName
  })
};
