import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Lap, LapFacade } from '@sailrc/race/domain';

@Injectable()
export class RaceStartFeatureFacade extends BaseFormFacade<Lap> implements IEntityFormFacade<Lap> {
  private readonly _lapIdPathVariable;
  private readonly _raceIdPathVariable;

  constructor(protected store: Store<any>, protected router: Router, raceFieldMarkFacade: LapFacade) {
    super(Lap, store, router, raceFieldMarkFacade);
    this._lapIdPathVariable = raceFieldMarkFacade.entityIdPathVariable;
    this._raceIdPathVariable = raceFieldMarkFacade.raceIdPathVariable;
  }

  // region public accessors and mutators
  navigateTo(navigateTo: string, returnTo?: any) {
    if (!returnTo) {
      returnTo = this.router.url;
    }
    this.router.navigateByUrl(navigateTo);
  }
  // endregion

  // region properties
  get lapIdPathVariable(): string {
    return this._lapIdPathVariable;
  }
  get raceIdPathVariable(): string {
    return this._raceIdPathVariable;
  }
  // endregion
}
