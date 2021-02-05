import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class BoatFeatureFacade extends BaseFormFacade<Boat> implements IEntityFormFacade<Boat> {

  constructor( protected store: Store<any>, protected router: Router ) {
    super( Boat, store, router );
  }

  public navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/boat/${id}/details`, returnTo );
  }
}
