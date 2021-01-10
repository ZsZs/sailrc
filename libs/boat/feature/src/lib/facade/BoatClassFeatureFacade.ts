import { Injectable } from '@angular/core';
import { BoatClass } from '@sailrc/boat/domain';
import { BoatClassFeatureFacadeBase } from '../store/boat-feature.reducer';
import { IEntityFormFacade } from '@sailrc/shared/base';

@Injectable({providedIn: 'any'})
export class BoatClassFeatureFacade extends BoatClassFeatureFacadeBase implements IEntityFormFacade<BoatClass> {
}
