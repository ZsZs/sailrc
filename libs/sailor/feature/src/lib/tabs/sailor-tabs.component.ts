import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { BaseTabsComponent } from '@processpuzzle/shared/base';

@Component({
  selector: 'sailrc-sailor-tabs',
  templateUrl: './sailor-tabs.component.html',
  styleUrls: ['./sailor-tabs.component.css']
})
export class SailorTabsComponent extends BaseTabsComponent<Sailor>{
  constructor(
    protected sailorFacade: SailorFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( sailorFacade, activeTabService, routerFacade, route );
  }

  // protected, private helper methods
}
