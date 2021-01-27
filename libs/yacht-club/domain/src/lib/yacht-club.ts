import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({modelName: 'YachtClub', pluralName: 'yachtClubs', uriName: 'yacht-clubs' })
export class YachtClub implements BaseEntityInterface{
  @Key id: string;
  name: string;
}
