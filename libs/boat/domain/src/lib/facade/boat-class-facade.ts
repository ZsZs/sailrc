import { Injectable } from '@angular/core';
import { BoatClassFacadeBase } from '../store/boat-class-state';
import { BoatClass } from '../domain/boat-class';
import { Store } from '@ngrx/store';
import { BoatClassState } from '../store/boat-domain.state';

@Injectable({ providedIn: 'root' })
export class BoatClassFacade extends BoatClassFacadeBase {

  constructor( protected store: Store<BoatClassState> ) {
    super( BoatClass, store );
  }

}
