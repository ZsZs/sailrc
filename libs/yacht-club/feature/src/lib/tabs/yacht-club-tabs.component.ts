import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActiveTabService,  BaseTabsComponent } from '@processpuzzle/shared/base';
import { YachtClub } from '@sailrc/yacht-club/domain';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';

@Component({
  selector: 'sailrc-yacht-club-tabs',
  templateUrl: './yacht-club-tabs.component.html',
  styleUrls: ['./yacht-club-tabs.component.css']
})
export class YachtClubTabsComponent extends BaseTabsComponent<YachtClub>{
  constructor(
    protected yachtClubFeatureFacade: YachtClubFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    super( yachtClubFeatureFacade, activeTabService, route );
  }

  // protected, private helper methods
}
