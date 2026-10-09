import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseResolver } from '@processpuzzle/shared/base';
import { Registration, RegistrationFacade } from '@sailrc/race/domain';
import { IRaceFeatureState } from '../store/race-feature.reducer';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RegistrationResolver extends BaseResolver<Registration> {
  constructor(protected registrationFacade: RegistrationFacade, protected store: Store<IRaceFeatureState>) {
    super(registrationFacade, store);
  }

  protected adjustEntity(entity: Registration, route: ActivatedRouteSnapshot): Registration {
    entity.raceId = this.resolveParameter(route, 'RaceId');
    return entity;
  }

  protected loadEntity(entityId: string, route: ActivatedRouteSnapshot) {
    const raceId = this.resolveParameter(route, 'RaceId');
    this.entityFacade.load({ id: entityId }, raceId);
  }
}
