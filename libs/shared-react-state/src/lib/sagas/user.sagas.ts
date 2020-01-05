import { takeLatest, put } from 'redux-saga/effects';
import { UserActionTypes } from '../types/user.types';
import * as firebaseUtils from '@points/firebase';
import { userActions } from '../actions';
import { AnyAction } from 'redux';
import { FirebaseCollection } from '@points/firebase';

export function* login() {
  try {
    const user = yield firebaseUtils.login();
    yield put(userActions.loginSuccess(user));
  } catch (error) {
    yield put(userActions.loginFailure(error));
  }
}
export function* logout() {
  try {
    yield firebaseUtils.logout();
    yield put(userActions.logoutSuccess());
  } catch (error) {
    yield put(userActions.logoutFailure(error));
  }
}

export function* updateUser({ ID, update }: AnyAction) {
  try {
    const db = firebaseUtils.initFirestore();
    const usersRef = yield db.collection(FirebaseCollection.Users);
    const userRef = usersRef.doc(ID);
    userRef.update(update);
    const user = yield userRef.get();
    yield put(userActions.updateUserSuccess(user.data()));
  } catch (error) {
    yield put(userActions.updateUserFailure(error));
  }
}

export function* userSaga() {
  yield takeLatest(UserActionTypes.Login, login);
  yield takeLatest(UserActionTypes.Logout, logout);
  yield takeLatest(UserActionTypes.Update, updateUser);
}
