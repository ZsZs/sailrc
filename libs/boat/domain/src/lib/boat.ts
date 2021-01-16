import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({modelName: "Boat"})
export class Boat implements BaseEntityInterface{
  @Key id: string;
  name: string;
  sailNumber: string;
  boatClass: string;
}
