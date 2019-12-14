import {
  UserActionType as ActionType,
  UserActionTypes as ActionTypes
} from '../types';
import { User } from '@points/shared-models';

const userInitialState = null;

export default (user: User = userInitialState, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.LoginSuccess:
    case ActionTypes.UpdateSuccess:
      return { ...user, ...action.payload };
    case ActionTypes.LoginFailure:
    case ActionTypes.LogoutSuccess:
    case ActionTypes.DeleteSuccess:
      return null;
    default:
      return user;
  }
};
