import { Program } from '@points/shared-models';

export enum ActionTypes {
  GetAll = '[PROGRAM] Get All',
  GetAllSuccess = '[PROGRAM] Get All Success',
  GetAllFailure = '[PROGRAM] Get All Failure',
  GetById = '[PROGRAM] Get By Id',
  GetByIdSuccess = '[PROGRAM] Get By Id Success',
  GetByIdFailure = '[PROGRAM] Get By Id Failure',
  Add = '[PROGRAM] Add',
  AddSuccess = '[PROGRAM] Add Success',
  AddFailure = '[PROGRAM] Add Failure',
  Update = '[PROGRAM] Update',
  UpdateSuccess = '[PROGRAM] Update Success',
  UpdateFailure = '[PROGRAM] Update Failure',
  Delete = '[PROGRAM] Delete',
  DeleteSuccess = '[PROGRAM] Delete Success',
  DeleteFailure = '[PROGRAM] Delete Failure'
}

interface getAll {
  type: ActionTypes.GetAll;
}
interface getAllSuccess {
  type: ActionTypes.GetAllSuccess;
  payload: Array<Program>;
}
interface getAllFailure {
  type: ActionTypes.GetAllFailure;
  payload: Error;
}
interface getById {
  type: ActionTypes.GetById;
  payload: string;
}
interface getByIdSuccess {
  type: ActionTypes.GetByIdSuccess;
  payload: Program;
}
interface getByIdFailure {
  type: ActionTypes.GetByIdFailure;
  payload: Error;
}
interface addProgram {
  type: ActionTypes.Add;
  payload: Program;
}
interface addProgramSuccess {
  type: ActionTypes.AddSuccess;
  payload: Program;
}
interface addProgramFailure {
  type: ActionTypes.AddFailure;
  payload: Error;
}
interface updateProgram {
  type: ActionTypes.Update;
  payload: Partial<Program>;
}
interface updateProgramSuccess {
  type: ActionTypes.UpdateSuccess;
  payload: Program;
}
interface updateProgramFailure {
  type: ActionTypes.UpdateFailure;
  payload: Error;
}
interface deleteProgram {
  type: ActionTypes.Delete;
  payload: string;
}
interface deleteProgramSuccess {
  type: ActionTypes.DeleteSuccess;
  payload: string;
}
interface deleteProgramFailure {
  type: ActionTypes.DeleteFailure;
  payload: Error;
}

export type ActionType =
  | getAll
  | getAllSuccess
  | getAllFailure
  | getById
  | getByIdSuccess
  | getByIdFailure
  | addProgram
  | addProgramSuccess
  | addProgramFailure
  | updateProgram
  | updateProgramSuccess
  | updateProgramFailure
  | deleteProgram
  | deleteProgramSuccess
  | deleteProgramFailure;
