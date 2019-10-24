import { Program } from '@points/shared-models';

export enum ProgramActionTypes {
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
  type: ProgramActionTypes.GetAll;
}
interface getAllSuccess {
  type: ProgramActionTypes.GetAllSuccess;
  payload: Array<Program>;
}
interface getAllFailure {
  type: ProgramActionTypes.GetAllFailure;
  payload: Error;
}
interface getById {
  type: ProgramActionTypes.GetById;
  payload: string;
}
interface getByIdSuccess {
  type: ProgramActionTypes.GetByIdSuccess;
  payload: Program;
}
interface getByIdFailure {
  type: ProgramActionTypes.GetByIdFailure;
  payload: Error;
}
interface addProgram {
  type: ProgramActionTypes.Add;
  payload: Program;
}
interface addProgramSuccess {
  type: ProgramActionTypes.AddSuccess;
  payload: Program;
}
interface addProgramFailure {
  type: ProgramActionTypes.AddFailure;
  payload: Error;
}
interface updateProgram {
  type: ProgramActionTypes.Update;
  payload: Partial<Program>;
}
interface updateProgramSuccess {
  type: ProgramActionTypes.UpdateSuccess;
  payload: Program;
}
interface updateProgramFailure {
  type: ProgramActionTypes.UpdateFailure;
  payload: Error;
}
interface deleteProgram {
  type: ProgramActionTypes.Delete;
  payload: string;
}
interface deleteProgramSuccess {
  type: ProgramActionTypes.DeleteSuccess;
  payload: string;
}
interface deleteProgramFailure {
  type: ProgramActionTypes.DeleteFailure;
  payload: Error;
}

export type ProgramActionType =
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
