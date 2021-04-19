import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

export const initializeParticipant = {
  fromServer: (data: Participant): Participant => ({...INITIAL_PARTICIPANT_VALUE, ...data})
}

@Entity({modelName: 'Participant', pluralName: 'participants', uriName: 'races/:RaceId/laps/:LapId/participants', transform: [initializeParticipant]})
export class Participant implements BaseEntityInterface {
  @Key id: string;
  raceId: string;
  lapId: string;
  registrationId: string;
  sailNumber: string;
  boatName: string;
  boatType: string;
  skipper: string;
}

export const INITIAL_PARTICIPANT_VALUE: Participant = {
  id: undefined,
  raceId: undefined,
  lapId: undefined,
  registrationId: undefined,
  boatName: '',
  boatType: undefined,
  sailNumber: '',
  skipper: ''
}
