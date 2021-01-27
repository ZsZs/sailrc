import { Entity, Key } from '@briebug/ngrx-auto-entity';

import { BaseEntityInterface } from '@processpuzzle/shared/base';

@Entity({modelName : 'BoatClass', pluralName: 'boatClasses', uriName: 'boat-classes' })
export class BoatClass implements BaseEntityInterface {
  @Key id: string;
  name: string;
  yardstick: number;
}
