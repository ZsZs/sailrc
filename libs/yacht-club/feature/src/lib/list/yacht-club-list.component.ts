import { Component } from '@angular/core';
import { YachtClub } from '@sailrc/yacht-club/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';

@Component({
  selector: 'sailrc-yacht-club-list',
  templateUrl: './yacht-club-list.component.html',
  styleUrls: ['./yacht-club-list.component.css']
})

export class YachtClubListComponent extends BaseListComponent<YachtClub>{
  displayedColumns = ['select', 'name'];

  constructor(
    protected yachtClubFeatureFacade: YachtClubFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( yachtClubFeatureFacade, route, activeTabService, subscriptionService );
  }

  // event handling methods

  // protected, private helper methods
}
