export enum FirebaseActionTypes {
  Initialize = '[FIREBASE] Initialize',
  InitializeSuccess = '[FIREBASE] Initialize Success',
  InitializeFailure = '[FIREBASE] Initialize Failure'
}

interface Initialize {
  type: FirebaseActionTypes.Initialize;
}

interface InitializeSuccess {
  type: FirebaseActionTypes.InitializeSuccess;
}

interface InitializeFailure {
  type: FirebaseActionTypes.InitializeFailure;
}

export type FirebaseActionType =
  | Initialize
  | InitializeSuccess
  | InitializeFailure;
