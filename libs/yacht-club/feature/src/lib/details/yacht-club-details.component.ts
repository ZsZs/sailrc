import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseFormComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';
import { IYachtClubFeatureState } from '../yacht-club.reducer';

@Component({
  selector: 'sailrc-yacht-club-details',
  templateUrl: './yacht-club-details.component.html',
  styleUrls: ['./yacht-club-details.component.css']
})
export class YachtClubDetailsComponent extends BaseFormComponent<YachtClub> {

  constructor(
    protected yachtClubFacade: YachtClubFacade,
    protected yachtClubFormFacade: YachtClubFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IYachtClubFeatureState>,
  ) {
    super( yachtClubFacade, yachtClubFormFacade, routerFacade, route, activeTabService, componentDestroyService, 'yacht-club-details' );
  }

  // event handling methods

  // public accessors and mutators

  // protected, private helper methods
}
