import { Injectable } from '@angular/core';
import { BoatClassFacadeBase, BoatClassState } from '../store/boat-class-reducer';
import { BoatClass } from '../domain/boat-class';
import { Store } from '@ngrx/store';

@Injectable()
export class BoatClassFacade extends BoatClassFacadeBase {

  constructor( protected store: Store<BoatClassState> ) {
    super( BoatClass, store);
  }

}
