import { Injectable } from '@angular/core';

import { BaseFormFacade, IEntityFormFacade } from '@processpuzzle/shared/base';

import { YachtClub } from '@sailrc/yacht-club/domain';

@Injectable({providedIn: 'root'})
export class YachtClubFeatureFacade extends BaseFormFacade<YachtClub> implements IEntityFormFacade<YachtClub> {
}
