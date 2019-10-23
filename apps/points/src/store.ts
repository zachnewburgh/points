import { createStore, combineReducers } from 'redux';
import { programsReducer, userReducer } from '@points/shared-react-state';

const devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const rootReducer = combineReducers({
  programs: programsReducer,
  user: userReducer
});

export default createStore(rootReducer, devTools);
