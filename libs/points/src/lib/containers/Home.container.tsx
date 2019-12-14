import { connect } from 'react-redux';
import { Home } from '../pages';
import { AppState } from '@points/points';
import { Dispatch } from 'redux';
import { searchActions } from '@points/shared-react-state';

const mapStateToProps = (state: AppState) => ({
  arriving: state.search.arriving,
  departing: state.search.departing,
  program: state.search.program,
  programs: state.programs,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setArriving: (airportName: string) =>
    dispatch(searchActions.setArriving(airportName)),
  setDeparting: (airportName: string) =>
    dispatch(searchActions.setDeparting(airportName)),
  setProgram: (program: string) => dispatch(searchActions.setProgram(program))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
