import { State } from './state';

export class Country {
  id: number;
  code: string;
  name: string;
  states: State[];
}
