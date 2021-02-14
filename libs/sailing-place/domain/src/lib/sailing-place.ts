import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { Entity, Key } from '@briebug/ngrx-auto-entity';

export const initializeSailingPlace = {
  fromServer: (data: any): SailingPlace => ({ ...INITIAL_SAILING_PLACE_VALUE, ...data})
};

@Entity({modelName: 'SailingPlace', pluralName: 'sailingPlaces', uriName: 'sailingPlaces', transform: [initializeSailingPlace] })
export class SailingPlace implements BaseEntityInterface {
  @Key id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  }
}

export const INITIAL_SAILING_PLACE_VALUE : SailingPlace = {
  id: undefined,
  name: '',
  coordinates: {
    lat: 51.678418,
    lng: 7.809007
  }
}
