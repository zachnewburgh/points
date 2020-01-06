import { Program } from '@points/shared-models';

export interface State {
  ids: string[];
  entities: Entities;
}

export interface Entities {
  [id: string]: Program;
}
