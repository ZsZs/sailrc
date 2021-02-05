import { Component } from '@angular/core';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';

@Component({
  selector: 'sailrc-yacht-club-list',
  templateUrl: './yacht-club-list.component.html',
  styleUrls: ['./yacht-club-list.component.css']
})

export class YachtClubListComponent extends BaseListComponent<YachtClub>{
  protected static readonly tabName = 'yacht-club-list';
  displayedColumns = ['select', 'name'];

  constructor(
    protected boatClassFacade: YachtClubFacade,
    protected yachtClubFeatureFacade: YachtClubFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( boatClassFacade, yachtClubFeatureFacade, route, activeTabService, subscriptionService, YachtClubListComponent.tabName );
  }

  // event handling methods

  // protected, private helper methods
}
