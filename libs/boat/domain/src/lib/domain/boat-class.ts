import { Key } from '@briebug/ngrx-auto-entity';

import { BaseEntityInterface } from '@sailrc/shared/base';

export class BoatClass implements BaseEntityInterface {
  @Key id: string;
  name: string;
  yardstick: number;
}
