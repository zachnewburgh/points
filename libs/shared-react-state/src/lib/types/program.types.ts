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

interface GetAll {
  type: ProgramActionTypes.GetAll;
}
interface GetAllSuccess {
  type: ProgramActionTypes.GetAllSuccess;
  payload: Program[];
}
interface GetAllFailure {
  type: ProgramActionTypes.GetAllFailure;
  payload: Error;
}
interface GetById {
  type: ProgramActionTypes.GetById;
  payload: string;
}
interface GetByIdSuccess {
  type: ProgramActionTypes.GetByIdSuccess;
  payload: Program;
}
interface GetByIdFailure {
  type: ProgramActionTypes.GetByIdFailure;
  payload: Error;
}
interface AddProgram {
  type: ProgramActionTypes.Add;
  payload: string;
}
interface AddProgramSuccess {
  type: ProgramActionTypes.AddSuccess;
  payload: Program[];
}
interface AddProgramFailure {
  type: ProgramActionTypes.AddFailure;
  payload: Error;
}
interface UpdateProgram {
  type: ProgramActionTypes.Update;
  ID: string;
  update: Partial<Program>;
}
interface UpdateProgramSuccess {
  type: ProgramActionTypes.UpdateSuccess;
  payload: Program[];
}
interface UpdateProgramFailure {
  type: ProgramActionTypes.UpdateFailure;
  payload: Error;
}
interface DeleteProgram {
  type: ProgramActionTypes.Delete;
  payload: string;
}
interface DeleteProgramSuccess {
  type: ProgramActionTypes.DeleteSuccess;
  payload: Program[];
}
interface DeleteProgramFailure {
  type: ProgramActionTypes.DeleteFailure;
  payload: Error;
}

export type ProgramActionType =
  | GetAll
  | GetAllSuccess
  | GetAllFailure
  | GetById
  | GetByIdSuccess
  | GetByIdFailure
  | AddProgram
  | AddProgramSuccess
  | AddProgramFailure
  | UpdateProgram
  | UpdateProgramSuccess
  | UpdateProgramFailure
  | DeleteProgram
  | DeleteProgramSuccess
  | DeleteProgramFailure;
