import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeYachtClub = {
  fromServer: (data: any): YachtClub => ({ ...INITIAL_YACHT_CLUB_VALUE, ...data})
};

@Entity({modelName: 'YachtClub', pluralName: 'yachtClubs', uriName: 'yacht-clubs', transform: [initializeYachtClub] })
export class YachtClub implements BaseEntityInterface{
  @Key id: string;
  name: string;
  logoUrl: string;
}

export const INITIAL_YACHT_CLUB_VALUE = {
  id: undefined,
  name: '',
  logoUrl: '/assets/logo-placeholder.png'
}
