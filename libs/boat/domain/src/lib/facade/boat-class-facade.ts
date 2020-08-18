import { Injectable } from '@angular/core';
import { BoatClassFacadeBase } from '../store/boat-domain-state';
import { BoatClass } from '../domain/boat-class';
import { Store } from '@ngrx/store';
import { BoatClassState } from '../store/boat-domain.state';
import { BaseEntityFacade } from '@sailrc/shared/base';

@Injectable({ providedIn: 'root' })
export class BoatClassFacade extends BoatClassFacadeBase implements BaseEntityFacade<BoatClass>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<BoatClassState> ) {
    super( BoatClass, store );
    this.entityIdPathVariable = 'boatClassId';
    this.entityName = 'boatClass';
  }
}
