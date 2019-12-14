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
    case ActionTypes.GetAllSuccess:
    case ActionTypes.AddSuccess:
    case ActionTypes.UpdateSuccess:
    case ActionTypes.DeleteSuccess: {
      return {
        ids: action.payload.map(program => program.id),
        entities: action.payload.reduce(
          (map, program) => ({ ...map, [program.id]: program }),
          {}
        )
      };
    }
    default:
      return state;
  }
};
