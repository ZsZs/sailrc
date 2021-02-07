import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

export const initializeSailor = {
  fromServer: (data: any): Sailor => ({...INITIAL_SAILOR_VALUE, ...data})
}

@Entity({modelName: 'Sailor', pluralName: 'sailors', uriName: 'sailors', transform: [initializeSailor] })
export class Sailor implements BaseEntityInterface {
  @Key id: string;
  firstName: string;
  lastName: string;
  yachtClub: string;
  boat: string;
  photoUrl: string;
}

export const INITIAL_SAILOR_VALUE: Sailor = {
  id: undefined,
  firstName: '',
  lastName: '',
  yachtClub: '',
  boat: '',
  photoUrl: 'photo-placeholder.jpg'
}
