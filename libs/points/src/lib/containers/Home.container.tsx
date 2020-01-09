import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Home } from '../pages';
import { AppState } from '../state.interfaces';

const mapStateToProps = (state: AppState) => ({
  programs: state.programs,
  user: state.user
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
