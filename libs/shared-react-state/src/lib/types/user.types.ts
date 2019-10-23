import { User } from '@points/shared-models';

export enum ActionTypes {
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
  type: ActionTypes.Login;
}
interface loginSuccessAction {
  type: ActionTypes.LoginSuccess;
  payload: User;
}
interface loginFailureAction {
  type: ActionTypes.LoginFailure;
  payload: Error;
}
interface logoutAction {
  type: ActionTypes.Logout;
}
interface logoutSuccessAction {
  type: ActionTypes.LogoutSuccess;
  payload: User;
}
interface logoutFailureAction {
  type: ActionTypes.LogoutFailure;
  payload: Error;
}
interface addUserAction {
  type: ActionTypes.Add;
  payload: User;
}
interface addUserSuccessAction {
  type: ActionTypes.AddSuccess;
  payload: string;
}
interface addUserFailureAction {
  type: ActionTypes.AddFailure;
  payload: { user: User; error: Error };
}
interface updateUserAction {
  type: ActionTypes.Update;
  payload: Partial<User>;
}
interface updateUserSuccessAction {
  type: ActionTypes.UpdateSuccess;
  payload: string;
}
interface updateUserFailureAction {
  type: ActionTypes.UpdateFailure;
  payload: { userPartial; error: Error };
}
interface deleteUserAction {
  type: ActionTypes.Delete;
  payload: string;
}
interface deleteUserSuccessAction {
  type: ActionTypes.DeleteSuccess;
  payload: string;
}
interface deleteUserFailureAction {
  type: ActionTypes.DeleteFailure;
  payload: { userId: string; error: Error };
}

export type ActionType =
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
