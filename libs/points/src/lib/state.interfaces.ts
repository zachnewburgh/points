import { ProgramsState, SearchState } from '@points/shared-react-state';
import { User } from '@points/shared-models';

export interface AppState {
  programs: ProgramsState;
  search: SearchState;
  user: User;
  firebase: { isReady: boolean };
}
