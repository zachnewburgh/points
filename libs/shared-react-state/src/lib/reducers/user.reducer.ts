import {
  UserActionType as ActionType,
  UserActionTypes as ActionTypes
} from '../types';

export default (user = null, action: ActionType) => {
  switch (action.type) {
    case ActionTypes.LoginSuccess:
      return { user, ...action.payload };
    case ActionTypes.LoginFailure:
    case ActionTypes.LogoutSuccess:
    case ActionTypes.DeleteSuccess:
      return null;
    default:
      return user;
  }
};
