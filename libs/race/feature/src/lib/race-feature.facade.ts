import { Injectable } from '@angular/core';
import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';
import { Race } from '@sailrc/race/domain';

@Injectable({providedIn: 'root'})
export class RaceFeatureFacade extends BaseFormFacade<Race> implements IEntityFormFacade<Race> {
}
