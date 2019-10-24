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

interface loginAction {
  type: UserActionTypes.Login;
}
interface loginSuccessAction {
  type: UserActionTypes.LoginSuccess;
  payload: User;
}
interface loginFailureAction {
  type: UserActionTypes.LoginFailure;
  payload: Error;
}
interface logoutAction {
  type: UserActionTypes.Logout;
}
interface logoutSuccessAction {
  type: UserActionTypes.LogoutSuccess;
  payload: User;
}
interface logoutFailureAction {
  type: UserActionTypes.LogoutFailure;
  payload: Error;
}
interface addUserAction {
  type: UserActionTypes.Add;
  payload: User;
}
interface addUserSuccessAction {
  type: UserActionTypes.AddSuccess;
  payload: string;
}
interface addUserFailureAction {
  type: UserActionTypes.AddFailure;
  payload: { user: User; error: Error };
}
interface updateUserAction {
  type: UserActionTypes.Update;
  payload: Partial<User>;
}
interface updateUserSuccessAction {
  type: UserActionTypes.UpdateSuccess;
  payload: string;
}
interface updateUserFailureAction {
  type: UserActionTypes.UpdateFailure;
  payload: { userPartial; error: Error };
}
interface deleteUserAction {
  type: UserActionTypes.Delete;
  payload: string;
}
interface deleteUserSuccessAction {
  type: UserActionTypes.DeleteSuccess;
  payload: string;
}
interface deleteUserFailureAction {
  type: UserActionTypes.DeleteFailure;
  payload: { userId: string; error: Error };
}

export type UserActionType =
  | loginAction
  | loginSuccessAction
  | loginFailureAction
  | logoutAction
  | logoutSuccessAction
  | logoutFailureAction
  | addUserAction
  | addUserSuccessAction
  | addUserFailureAction
  | updateUserAction
  | updateUserSuccessAction
  | updateUserFailureAction
  | deleteUserAction
  | deleteUserSuccessAction
  | deleteUserFailureAction;
