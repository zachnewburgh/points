import { connect } from 'react-redux';
import { AppState } from '@points/points';
import { Dispatch } from 'redux';
import {
  firebaseActions,
  userActions,
  programActions
} from '@points/shared-react-state';
import App from './App';

const mapStateToProps = (state: AppState) => ({
  user: state.user,
  programs: state.programs,
  isReady: state.firebase.isReady
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initializeFirebase: () => dispatch(firebaseActions.initialize()),
  login: () => dispatch(userActions.login()),
  logout: () => dispatch(userActions.logout()),
  getPrograms: () => dispatch(programActions.getAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
