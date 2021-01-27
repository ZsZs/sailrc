import { Participant } from './participant';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({ modelName: 'Lap'})
export class Lap {
  @Key index: number;
  raceId: string;
  startTime: Date;
  finishTime: Date;
  participants: Participant[];
}
