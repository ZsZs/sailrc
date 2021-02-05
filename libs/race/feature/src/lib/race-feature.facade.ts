import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Race } from '@sailrc/race/domain';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class RaceFeatureFacade extends BaseFormFacade<Race> implements IEntityFormFacade<Race> {

  constructor( protected store: Store<any>, protected router: Router ) {
    super( Race, store, router );
  }

  public navigateToDetails( id: string, returnTo?: string ) {
    super.navigateToDetails(`/race-planning/race/${id}/details`, returnTo );
  }
}
