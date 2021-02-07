import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { Registration } from './registration';

export const initializeRace = {
  fromServer: (data: any): Race => ({...INITIAL_RACE_VALUE, ...data})
}

@Entity({modelName: 'Race', pluralName: 'races', uriName: 'races', transform: [initializeRace]})
export class Race implements BaseEntityInterface {
  @Key id: string;
  title: string;
  fromDate: Date;
  toDate: Date;
  country: string;
  place: string;
  organizer: string;
  state?: 'planned' | 'completed' | 'cancelled' | null;
}

export const INITIAL_RACE_VALUE: Race = {
  id: undefined,
  title: '',
  fromDate: undefined,
  toDate: undefined,
  country: 'Germany',
  place: '',
  organizer: '',
  state: 'planned'
};
