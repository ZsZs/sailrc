import { Participant } from './participant';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeLap = {
  fromServer: (data: any): Lap => ({...INITIAL_LAP_VALUE, ...data, startTime: data.startTime ? data.startTime.toDate() : undefined })
}

export enum LapState {
  Planned,
  Initialized,
  Starting,
  Started,
  Running,
  Finished,
  Cancelled
}

@Entity({modelName: 'Lap', pluralName: 'laps', uriName: 'races/:RaceId/laps', transform: [initializeLap]})
export class Lap {
  @Key id: string;
  index: number;
  raceId: string;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
  state: LapState = LapState.Planned;

  // region public accessor and mutators
  public setStartTime( startTime: Date ): void {
    this.startTime = startTime;
    this.state = LapState.Initialized;
  }

  public start(): void {
    this.state = LapState.Starting;
  }

  public stop(): void {
    this.state = LapState.Planned;
  }
  // endregion
}

export const INITIAL_LAP_VALUE: Lap = new Lap();
/*
{
  id: undefined,
  raceId: undefined,
  index: undefined,
  startTime: undefined,
  finishTime: null,
  participants: [],
  state: LapState.Planned
}
 */
