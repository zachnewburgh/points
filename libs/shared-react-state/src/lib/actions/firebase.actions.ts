import { FirebaseActionTypes } from '../types';

export default {
  initialize: () => {
    return { type: FirebaseActionTypes.Initialize };
  },
  initializeSuccess: () => {
    return { type: FirebaseActionTypes.InitializeSuccess };
  },
  initializeFailure: () => {
    return { type: FirebaseActionTypes.InitializeFailure };
  }
};
