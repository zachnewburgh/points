import { User } from '@points/shared-models';
import { userActions } from '@points/shared-react-state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Home } from '../pages';
import { AppState } from '../state.interfaces';

const mapStateToProps = (state: AppState) => ({
  programs: state.programs,
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onBalanceUpdate: (ID: string, update: Partial<User>) =>
    dispatch(userActions.updateUser(ID, update))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
