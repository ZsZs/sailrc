import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

@Entity({modelName: 'Sailor', pluralName: 'sailors', uriName: 'sailors' })
export class Sailor implements BaseEntityInterface {
  @Key id: string;
  firstName: string;
  lastName: string;
  yachtClub = '';
  boat = '';
  photoUrl = '';
}

export const INITIAL_SAILOR_VALUE: Sailor = {
  id: undefined,
  firstName: '',
  lastName: '',
  yachtClub: '',
  boat: '',
  photoUrl: undefined
}
