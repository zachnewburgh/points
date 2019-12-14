import { connect } from 'react-redux';
import { AppState } from '@points/points';
import { Dispatch } from 'redux';
import Admin from './Admin';
import { programActions } from '@points/shared-react-state';
import { Program } from '@points/shared-models';

const mapStateToProps = (state: AppState) => ({
  programs: state.programs.ids.map(id => state.programs.entities[id])
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProgram: (name: string) => dispatch(programActions.addProgram(name)),
  updateProgram: (ID: string, update: Partial<Program>) =>
    dispatch(programActions.updateProgram(ID, update)),
  deleteProgram: (ID: string) => dispatch(programActions.deleteProgram(ID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
