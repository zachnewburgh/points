import { Program } from '@points/shared-models';
import { ProgramActionTypes as ActionTypes } from '../types';

export default {
  getAll: () => ({
    type: ActionTypes.GetAll
  }),
  getAllSuccess: (programs: Program[]) => ({
    type: ActionTypes.GetAllSuccess,
    payload: programs
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
  addProgram: (name: string) => ({
    type: ActionTypes.Add,
    payload: name
  }),
  addProgramSuccess: (programs: Program[]) => ({
    type: ActionTypes.AddSuccess,
    payload: programs
  }),
  addProgramFailure: (error: Error) => ({
    type: ActionTypes.AddFailure,
    payload: error
  }),
  updateProgram: (ID: string, update: Partial<Program>) => ({
    type: ActionTypes.Update,
    ID,
    update
  }),
  updateProgramSuccess: (programs: Program[]) => ({
    type: ActionTypes.UpdateSuccess,
    payload: programs
  }),
  updateProgramFailure: (error: Error) => ({
    type: ActionTypes.UpdateFailure,
    payload: error
  }),
  deleteProgram: (id: string) => ({
    type: ActionTypes.Delete,
    payload: id
  }),
  deleteProgramSuccess: (programs: Program[]) => ({
    type: ActionTypes.DeleteSuccess,
    payload: programs
  }),
  deleteProgramFailure: (error: Error) => ({
    type: ActionTypes.DeleteFailure,
    payload: error
  })
};
