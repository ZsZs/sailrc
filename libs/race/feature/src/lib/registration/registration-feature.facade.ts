import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Registration } from '@sailrc/race/domain';

@Injectable({providedIn: 'root'})
export class RegistrationFeatureFacade extends BaseFormFacade<Registration> implements IEntityFormFacade<Registration> {
}
