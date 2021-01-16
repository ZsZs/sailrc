import { Injectable } from '@angular/core';
import { BoatClass } from '@sailrc/boat-class/domain';
import { IEntityFormFacade } from '@processpuzzle/shared/base';
import { BaseFormFacade } from '@processpuzzle/shared/base';

@Injectable({providedIn: 'root'})
export class BoatClassFeatureFacade extends BaseFormFacade<BoatClass> implements IEntityFormFacade<BoatClass> {
}
