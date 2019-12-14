import { takeLatest, put } from 'redux-saga/effects';
import { FirebaseActionTypes } from '../types/firebase.types';
import * as firebaseUtils from '@points/firebase';
import { firebaseActions } from '../actions';

export function* initialize() {
  try {
    firebaseUtils.init();
    yield put(firebaseActions.initializeSuccess());
  } catch (error) {
    yield put(firebaseActions.initializeFailure());
  }
}

export function* firebaseSaga() {
  yield takeLatest(FirebaseActionTypes.Initialize, initialize);
}
