import { Program } from '@points/shared-models';

export interface State {
  ids: Array<string>;
  entities: { [id: string]: Program };
}
