import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeBoat = {
  fromServer: (data: any): Boat => ({ ...INITIAL_BOAT_VALUE, ...data})
};

@Entity({modelName: 'Boat', pluralName: 'boats', uriName: 'boats', transform: [initializeBoat] })
export class Boat implements BaseEntityInterface{
  @Key id: string;
  name: string;
  sailNumber: string;
  boatClass: string;
  photoUrl: string;
}

export const INITIAL_BOAT_VALUE = {
  id: undefined,
  name: '',
  sailNumber: '',
  boatClass: '',
  photoUrl: '/assets/sail-boat-placeholder.jpg'
}
