import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseFormComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { YachtClub } from '@sailrc/yacht-club/domain';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';
import { IYachtClubFeatureState } from '../yacht-club.reducer';

@Component({
  selector: 'sailrc-yacht-club-details',
  templateUrl: './yacht-club-details.component.html',
  styleUrls: ['./yacht-club-details.component.css']
})
export class YachtClubDetailsComponent extends BaseFormComponent<YachtClub> {

  constructor(
    protected yachtClubFormFacade: YachtClubFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IYachtClubFeatureState>,
  ) {
    super( yachtClubFormFacade, routerFacade, route, activeTabService, componentDestroyService );
  }

  // event handling methods

  // public accessors and mutators

  // protected, private helper methods
}
