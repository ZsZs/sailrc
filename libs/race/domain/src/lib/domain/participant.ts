import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

export class Participant implements BaseEntityInterface {
  raceId: string;
  lapIndex: number;
  sailNumber: string;
  boatName: string;
  boatType: string;
  skipper: string;
  id: string; // not used here
}
