import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({modelName: 'Registration', pluralName: 'registrations', uriName: 'races/:raceId/registrations'})
export class Registration implements BaseEntityInterface {
  @Key id: string;
  raceId: string;
  sailNumber: string;
  boatName: string;
  boatClass: string;
  skipper: string;
}

export const INITIAL_REGISTRATION_VALUE: Registration = {
  id: undefined,
  raceId: undefined,
  sailNumber: ``,
  boatName: 'Cheerio',
  boatClass: 'Flying Dutchman',
  skipper: 'Zsolt Zsuffa'
};
