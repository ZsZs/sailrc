import { Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

export class Sailor implements BaseEntityInterface {
  @Key id: string;
  firstName: string;
  lastName: string;
}
