import { Entity, Key } from '@briebug/ngrx-auto-entity';

import { BaseEntityInterface } from '@processpuzzle/shared/base';

export const initializeBoatClass = {
  fromServer: (data: any): BoatClass => ({...INITIAL_BOAT_CLASS_VALUE, ...data})
}

@Entity({modelName : 'BoatClass', pluralName: 'boatClasses', uriName: 'boat-classes', transform: [initializeBoatClass] })
export class BoatClass implements BaseEntityInterface {
  @Key id: string;
  name: string;
  yardstick: number;
  classSymbolUrl: string
}

export const INITIAL_BOAT_CLASS_VALUE = {
  id: undefined,
  name: '',
  yardstick: undefined,
  classSymbolUrl: '/assets/logo-placeholder.png'
}
