import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseEntityFacade } from '@processpuzzle/shared/base';

import { BoatClass } from '../domain/boat-class';
import { BoatClassFacadeBase, IBoatClassState } from '../store/boat-class-domain.state';

@Injectable({ providedIn: 'root' })
export class BoatClassFacade extends BoatClassFacadeBase implements BaseEntityFacade<BoatClass>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<IBoatClassState> ) {
    super( BoatClass, store );
    this.entityIdPathVariable = 'boatClassId';
    this.entityName = 'boatClass';
  }
}
