import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { BaseTabsComponent } from '@sailrc/shared/base';
import { RouterFacade } from '@sailrc/shared/util';
import { ActiveTabService } from '@sailrc/shared/widgets';

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
