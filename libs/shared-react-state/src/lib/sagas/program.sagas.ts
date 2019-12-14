import { takeLatest, put } from 'redux-saga/effects';
import { programActions } from '../actions';
import * as firebaseUtils from '@points/firebase';
import { ProgramActionTypes } from '../types';
import { AnyAction } from 'redux';

export function* getAll() {
  try {
    const db = firebaseUtils.initFirestore();
    const programsRef = yield db
      .collection('programs')
      .orderBy('name')
      .get();
    const programs = programsRef.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    yield put(programActions.getAllSuccess(programs));
  } catch (error) {
    yield put(programActions.getAllFailure(error));
  }
}

export function* add({ payload: name }: AnyAction) {
  try {
    const db = firebaseUtils.initFirestore();
    const programsRef = yield db.collection('programs');
    yield programsRef.add({ name, transferRatiosByPartner: {} });
    const programsCollection = yield programsRef.orderBy('name').get();
    const programs = programsCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    yield put(programActions.addProgramSuccess(programs));
  } catch (error) {
    yield put(programActions.addProgramFailure(error));
  }
}

export function* updateProgram({ ID, update }: AnyAction) {
  try {
    const db = firebaseUtils.initFirestore();
    const programsRef = yield db.collection('programs');
    yield programsRef.doc(ID).update(update);
    const programsCollection = yield programsRef.orderBy('name').get();
    const programs = programsCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    yield put(programActions.updateProgramSuccess(programs));
  } catch (error) {
    yield put(programActions.updateProgramFailure(error));
  }
}

export function* deleteProgram({ payload: ID }: AnyAction) {
  try {
    const db = firebaseUtils.initFirestore();
    const programsRef = yield db.collection('programs');
    yield programsRef.doc(ID).delete();
    const programsCollection = yield programsRef.orderBy('name').get();
    const programs = programsCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    yield put(programActions.deleteProgramSuccess(programs));
  } catch (error) {
    yield put(programActions.deleteProgramFailure(error));
  }
}

export function* programSaga() {
  yield takeLatest(ProgramActionTypes.GetAll, getAll);
  yield takeLatest(ProgramActionTypes.Add, add);
  yield takeLatest(ProgramActionTypes.Update, updateProgram);
  yield takeLatest(ProgramActionTypes.Delete, deleteProgram);
}
