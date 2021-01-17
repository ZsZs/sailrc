import { Entity, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';

@Entity({modelName: 'Sailor'})
export class Sailor implements BaseEntityInterface {
  @Key id: string;
  firstName: string;
  lastName: string;
  yachtClub: string;
}
