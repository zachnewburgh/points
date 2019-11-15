import {
  ProgramActionType as ActionType,
  ProgramActionTypes as ActionTypes
} from '../types';
import { ProgramsState } from '../interfaces';

const programsInitialState = { ids: [], entities: {} };

export default (
  state: ProgramsState = programsInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypes.AddSuccess: {
      return {
        ids: [...state.ids, action.payload.id],
        entities: { ...state.entities, [action.payload.id]: action.payload }
      };
    }
    case ActionTypes.UpdateSuccess: {
      return {
        ids: [...state.ids],
        entities: { ...state.entities, [action.payload.id]: action.payload }
      };
    }
    case ActionTypes.DeleteSuccess: {
      const newEntities = { ...state.entities };
      delete newEntities[action.payload];
      return {
        ids: state.ids.filter(id => id !== action.payload),
        entities: newEntities
      };
    }
    default:
      return state;
  }
};
