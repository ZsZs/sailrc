import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RaceFieldMark, RaceFieldMarkFacade } from '@sailrc/race/domain';

@Injectable()
export class RaceFieldFeatureFacade extends BaseFormFacade<RaceFieldMark> implements IEntityFormFacade<RaceFieldMark> {
  private readonly _lapIdPathVariable;
  private readonly _raceIdPathVariable;

  constructor(protected store: Store<any>, protected router: Router, raceFieldMarkFacade: RaceFieldMarkFacade) {
    super(RaceFieldMark, store, router, raceFieldMarkFacade);
    this._lapIdPathVariable = raceFieldMarkFacade.lapIdPathVariable;
    this._raceIdPathVariable = raceFieldMarkFacade.raceIdPathVariable;
  }

  // region properties
  get lapIdPathVariable(): string {
    return this._lapIdPathVariable;
  }

  get raceIdPathVariable(): string {
    return this._raceIdPathVariable;
  }
  // endregion
}
