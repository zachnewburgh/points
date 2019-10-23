import { Program } from '@points/shared-models';
import { ProgramActionTypes as ActionTypes } from '../types';

export default {
  getAll: () => ({
    type: ActionTypes.GetAll
  }),
  getAllSuccess: (program: Array<Program>) => ({
    type: ActionTypes.GetAllSuccess,
    payload: program
  }),
  getAllFailure: (error: Error) => ({
    type: ActionTypes.GetAllFailure,
    payload: error
  }),
  getById: (id: string) => ({
    type: ActionTypes.GetById,
    payload: id
  }),
  getByIdSuccess: (program: Program) => ({
    type: ActionTypes.GetByIdSuccess,
    payload: program
  }),
  getByIdFailure: (error: Error) => ({
    type: ActionTypes.GetByIdFailure,
    payload: error
  }),
  addProgram: (program: Program) => ({
    type: ActionTypes.Add,
    payload: program
  }),
  addProgramSuccess: (program: Program) => ({
    type: ActionTypes.AddSuccess,
    payload: program
  }),
  addProgramFailure: (error: Error) => ({
    type: ActionTypes.AddFailure,
    payload: error
  }),
  updateProgram: (programPartial: Partial<Program>) => ({
    type: ActionTypes.Update,
    payload: programPartial
  }),
  updateProgramSuccess: (program: Program) => ({
    type: ActionTypes.UpdateSuccess,
    payload: program
  }),
  updateProgramFailure: (error: Error) => ({
    type: ActionTypes.UpdateFailure,
    payload: error
  }),
  deleteProgram: (id: string) => ({
    type: ActionTypes.Delete,
    payload: id
  }),
  deleteProgramSuccess: (id: string) => ({
    type: ActionTypes.DeleteSuccess,
    payload: id
  }),
  deleteProgramFailure: (error: Error) => ({
    type: ActionTypes.DeleteFailure,
    payload: error
  })
};
