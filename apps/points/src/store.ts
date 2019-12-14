import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  programsReducer,
  userReducer,
  searchReducer,
  userSaga,
  firebaseSaga,
  firebaseReducer,
  programSaga
} from '@points/shared-react-state';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  programs: programsReducer,
  user: userReducer,
  search: searchReducer,
  firebase: firebaseReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

function* rootSaga() {
  yield all([userSaga(), firebaseSaga(), programSaga()]);
}

sagaMiddleware.run(rootSaga);

export default store;
