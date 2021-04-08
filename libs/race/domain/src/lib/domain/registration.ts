import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeRegistration = {
  fromServer: (data: any): Registration => ({...INITIAL_REGISTRATION_VALUE, ...data})
}

@Entity({modelName: 'Registration', pluralName: 'registrations', uriName: 'races/:RaceId/registrations', transform: [initializeRegistration]})
export class Registration implements BaseEntityInterface {
  @Key id: string;
  raceId: string;
  boatId: string;
  boatName: string;
  boatType: string;
  sailorId: string;
  sailNumber: string;
  skipper: string;
  isParticipant?: boolean;
}

export const INITIAL_REGISTRATION_VALUE: Registration = {
  id: undefined,
  raceId: undefined,
  boatId: undefined,
  boatName: '',
  boatType: undefined,
  sailNumber: '',
  sailorId: undefined,
  skipper: ''
};
