import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';

@Component({
  selector: 'sailrc-yacht-club-tabs',
  templateUrl: './yacht-club-tabs.component.html',
  styleUrls: ['./yacht-club-tabs.component.css']
})
export class YachtClubTabsComponent extends BaseTabsComponent<YachtClub>{
  constructor(
    protected yachtClubFacade: YachtClubFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( yachtClubFacade, activeTabService, routerFacade, route );
  }

  // protected, private helper methods
}
