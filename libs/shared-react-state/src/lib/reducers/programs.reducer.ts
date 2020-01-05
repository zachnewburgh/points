import {
  ProgramActionType as ActionType,
  ProgramActionTypes as ActionTypes
} from '../types';
import { ProgramsState } from '../interfaces';
import { Program } from '@points/shared-models';

const programsInitialState = { ids: [], entities: {} };

interface ProgramsMap {
  ids: string[];
  entities: { [id: string]: Program };
}

const getIdsAndEntities = (map: ProgramsMap, program: Program) => {
  const ids = [...map.ids, program.id];
  const entities = { ...map.entities, [program.id]: program };
  return { ids, entities };
};

export default (
  state: ProgramsState = programsInitialState,
  action: ActionType
) => {
  switch (action.type) {
    case ActionTypes.GetAllSuccess:
    case ActionTypes.AddSuccess:
    case ActionTypes.UpdateSuccess:
    case ActionTypes.DeleteSuccess: {
      return action.payload.reduce(getIdsAndEntities, programsInitialState);
    }
    default:
      return state;
  }
};
