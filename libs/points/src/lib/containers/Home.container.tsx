import { connect } from 'react-redux';
import { Home } from '../pages';
import { AppState } from '@points/points';
import { Dispatch } from 'redux';
import { searchActions } from '@points/shared-react-state';

const mapStateToProps = (state: AppState) => ({
  arriving: state.search.arriving,
  departing: state.search.departing
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setArriving: (airportName: string) =>
    dispatch(searchActions.setArriving(airportName)),
  setDeparting: (airportName: string) =>
    dispatch(searchActions.setDeparting(airportName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
