import { Participant } from './participant';
import { Entity, Key, makeEntity } from '@briebug/ngrx-auto-entity';

export const initializeLap = {
  fromServer: (data: any): Lap => (makeEntity( Lap )({
    ...INITIAL_LAP_VALUE,
    ...data,
    startTime: data.startTime && data.startTime.toDate ? data.startTime.toDate() : undefined,
    finishTime: data.finishTime && data.finishTime.toDate ? data.finishTime.toDate() : undefined,
  }))
};

export enum LapState {
  Planned,
  Initialized,
  Countdown,
  Started,
  Running,
  Finished,
  Cancelled,
}

@Entity({ modelName: 'Lap', pluralName: 'laps', uriName: 'races/:RaceId/laps', transform: [initializeLap] })
export class Lap {
  @Key id: string;
  index: number;
  raceId: string;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
  state: LapState = LapState.Planned;

  // region public accessor and mutators
  public cancel(): void {
    if (this.state == LapState.Running) this.state = LapState.Cancelled;
    else throw new Error('Not allowed state transition.');
  }

  public finish(): void {
    if (this.state == LapState.Running) {
      this.state = LapState.Finished;
      this.finishTime = new Date();
    } else throw new Error('Not allowed state transition.');
  }

  public recall(): void {
    if (this.state == LapState.Started) {
      this.startTime = undefined;
      this.state = LapState.Planned;
    } else throw new Error('Not allowed state transition.');
  }

  public run(): void {
    if (this.state == LapState.Started) this.state = LapState.Running;
    else throw new Error('Not allowed state transition.');
  }

  public setStartTime( startTime: Date) {
    if (this.state == LapState.Planned || this.state == LapState.Initialized) {
      this.startTime = startTime;
      this.state = LapState.Initialized;
    } else {
      throw new Error('Lap state has to be PLANNED or INITIALIZED to be able to set start time.');
    }
  }

  public start(): void {
    if (this.state == LapState.Countdown) {
      this.state = LapState.Started;
    } else throw new Error('Not allowed state transition.');
  }

  public startCountdown(): void {
    if (this.state == LapState.Initialized) this.state = LapState.Countdown;
    else throw new Error('Not allowed state transition.');
  }

  public stop(): void {
    if (this.state == LapState.Countdown) this.state = LapState.Planned;
    else throw new Error('Not allowed state transition.');
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
