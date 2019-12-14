import { connect } from 'react-redux';
import { default as Programs } from './Programs';
import { AppState } from '@points/points';
import { Dispatch } from 'redux';
import { searchActions, userActions } from '@points/shared-react-state';
import { User } from '@points/shared-models';

const mapStateToProps = (state: AppState) => ({
  programs: state.programs.ids.map(id => state.programs.entities[id]),
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateUser: (ID: string, update: Partial<User>) =>
    dispatch(userActions.updateUser(ID, update)),
  setProgram: (program: string) => dispatch(searchActions.setProgram(program))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Programs);
