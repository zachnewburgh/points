import { User } from '@points/shared-models';

export enum UserActionTypes {
  Login = '[USER] Login',
  LoginSuccess = '[USER] Login Success',
  LoginFailure = '[USER] Login Failure',
  Logout = '[USER] Logout',
  LogoutSuccess = '[USER] Logout Success',
  LogoutFailure = '[USER] Logout Failure',
  Add = '[USER] Add',
  AddSuccess = '[USER] Add Success',
  AddFailure = '[USER] Add Failure',
  Update = '[USER] Update',
  UpdateSuccess = '[USER] Update Success',
  UpdateFailure = '[USER] Update Failure',
  Delete = '[USER] Delete',
  DeleteSuccess = '[USER] Delete Success',
  DeleteFailure = '[USER] Delete Failure'
}

interface LoginAction {
  type: UserActionTypes.Login;
}
interface LoginSuccessAction {
  type: UserActionTypes.LoginSuccess;
  payload: User;
}
interface LoginFailureAction {
  type: UserActionTypes.LoginFailure;
  payload: Error;
}
interface LogoutAction {
  type: UserActionTypes.Logout;
}
interface LogoutSuccessAction {
  type: UserActionTypes.LogoutSuccess;
}
interface LogoutFailureAction {
  type: UserActionTypes.LogoutFailure;
  payload: Error;
}
interface AddUserAction {
  type: UserActionTypes.Add;
  payload: User;
}
interface AddUserSuccessAction {
  type: UserActionTypes.AddSuccess;
  payload: string;
}
interface AddUserFailureAction {
  type: UserActionTypes.AddFailure;
  payload: { user: User; error: Error };
}
interface UpdateUserAction {
  type: UserActionTypes.Update;
  ID: string;
  update: Partial<User>;
}
interface UpdateUserSuccessAction {
  type: UserActionTypes.UpdateSuccess;
  payload: User;
}
interface UpdateUserFailureAction {
  type: UserActionTypes.UpdateFailure;
  payload: Error;
}
interface DeleteUserAction {
  type: UserActionTypes.Delete;
  payload: string;
}
interface DeleteUserSuccessAction {
  type: UserActionTypes.DeleteSuccess;
  payload: string;
}
interface DeleteUserFailureAction {
  type: UserActionTypes.DeleteFailure;
  payload: { userId: string; error: Error };
}

export type UserActionType =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | AddUserAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;
