import { User } from '@points/shared-models';
import {
  UserActionType as ActionType,
  UserActionTypes as ActionTypes
} from '../types';

export default {
  login: (): ActionType => ({ type: ActionTypes.Login }),
  loginSuccess: (user: User): ActionType => ({
    type: ActionTypes.LoginSuccess,
    payload: user
  }),
  loginFailure: (error: Error): ActionType => ({
    type: ActionTypes.LoginFailure,
    payload: error
  }),
  logout: (): ActionType => ({ type: ActionTypes.Logout }),
  logoutSuccess: (): ActionType => ({ type: ActionTypes.LogoutSuccess }),
  logoutFailure: (error: Error): ActionType => ({
    type: ActionTypes.LogoutFailure,
    payload: error
  }),
  addUser: (user: User): ActionType => ({
    type: ActionTypes.Add,
    payload: user
  }),
  addUserSuccess: (userId: string): ActionType => ({
    type: ActionTypes.AddSuccess,
    payload: userId
  }),
  addUserFailure: (user: User, error: Error): ActionType => ({
    type: ActionTypes.AddFailure,
    payload: { user, error }
  }),
  updateUser: (ID: string, update: Partial<User>): ActionType => ({
    type: ActionTypes.Update,
    ID,
    update
  }),
  updateUserSuccess: (user: User): ActionType => ({
    type: ActionTypes.UpdateSuccess,
    payload: user
  }),
  updateUserFailure: (error: Error): ActionType => ({
    type: ActionTypes.UpdateFailure,
    payload: error
  }),
  deleteUser: (userId: string): ActionType => ({
    type: ActionTypes.Delete,
    payload: userId
  }),
  deleteUserSuccess: (userId: string): ActionType => ({
    type: ActionTypes.DeleteSuccess,
    payload: userId
  }),
  deleteUserFailure: (userId: string, error: Error): ActionType => ({
    type: ActionTypes.DeleteFailure,
    payload: { userId, error }
  })
};
