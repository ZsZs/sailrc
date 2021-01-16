import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseEntityFacade } from '@processpuzzle/shared/base';
import { Boat } from './boat';
import { BoatFacadeBase, IBoatState } from './boat-state';

@Injectable({ providedIn: 'root' })
export class BoatFacade extends BoatFacadeBase implements BaseEntityFacade<Boat>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<IBoatState> ) {
    super( Boat, store );
    this.entityIdPathVariable = 'boatId';
    this.entityName = 'boat';
  }
}
