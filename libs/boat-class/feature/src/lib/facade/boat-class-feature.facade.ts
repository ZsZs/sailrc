import { Injectable } from '@angular/core';
import { BoatClass } from '@sailrc/boat-class/domain';
import { IEntityFormFacade } from '@processpuzzle/shared/base';
import { BaseFormFacade } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class BoatClassFeatureFacade extends BaseFormFacade<BoatClass> implements IEntityFormFacade<BoatClass> {
  constructor( protected store: Store<any>, protected router: Router ) {
    super( BoatClass, store, router );
  }

  public navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/boat-class/${id}/details`, returnTo );
  }
}
