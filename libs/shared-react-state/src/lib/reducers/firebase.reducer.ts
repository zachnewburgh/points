import {
  FirebaseActionType as ActionType,
  FirebaseActionTypes
} from '../types';

const firebaseInitialState = { isReady: false };

export default (state = firebaseInitialState, action: ActionType) => {
  switch (action.type) {
    case FirebaseActionTypes.InitializeSuccess:
      return { ...state, isReady: true };
    default:
      return state;
  }
};
