import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Sailor } from '@sailrc/sailor/domain';

@Injectable({providedIn: 'root'})
export class SailorFeatureFacade extends BaseFormFacade<Sailor> implements IEntityFormFacade<Sailor> {
}
