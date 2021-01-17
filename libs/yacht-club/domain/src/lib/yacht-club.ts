import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({modelName: 'YachtClub'})
export class YachtClub implements BaseEntityInterface{
  @Key id: string;
  name: string;
}
