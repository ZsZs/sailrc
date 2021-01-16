import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';

@Injectable({providedIn: 'root'})
export class BoatFeatureFacade extends BaseFormFacade<Boat> implements IEntityFormFacade<Boat> {
}
