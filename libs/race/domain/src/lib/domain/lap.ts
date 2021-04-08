import { Participant } from './participant';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeLap = {
  fromServer: (data: any): Lap => ({...INITIAL_LAP_VALUE, ...data})
}

@Entity({modelName: 'Lap', pluralName: 'laps', uriName: 'races/:RaceId/laps', transform: [initializeLap]})
export class Lap {
  @Key id: string;
  index: number;
  raceId: string;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
}

export const INITIAL_LAP_VALUE: Lap = {
  id: undefined,
  raceId: undefined,
  index: undefined,
  startTime: undefined,
  finishTime: undefined,
  participants: []
}
