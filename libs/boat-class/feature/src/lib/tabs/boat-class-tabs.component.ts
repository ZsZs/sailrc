import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';

@Component({
  selector: 'sailrc-boat-class-tabs',
  templateUrl: './boat-class-tabs.component.html',
  styleUrls: ['./boat-class-tabs.component.css']
})
export class BoatClassTabsComponent extends BaseTabsComponent<BoatClass> {

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( boatClassFacade, activeTabService, routerFacade, route );
  }

  // protected, private helper methods
}
