import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseEntityFacade } from '@processpuzzle/shared/base';
import { ISailorState, SailorFacadeBase } from '../store/sailor.state';
import { Sailor } from '../domain/sailor';

@Injectable({ providedIn: 'root' })
export class SailorFacade extends SailorFacadeBase implements BaseEntityFacade<Sailor>{
  entityIdPathVariable: string;
  entityName: string;

  constructor( protected store: Store<ISailorState> ) {
    super( Sailor, store );
    this.entityIdPathVariable = 'sailorId';
    this.entityName = 'sailor';
  }
}
