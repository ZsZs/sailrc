import { Component } from '@angular/core';

import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { RouterFacade } from '@sailrc/shared/util';
import { BaseListComponent } from '@sailrc/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-boat-class-list',
  templateUrl: './boat-class-list.component.html',
  styleUrls: ['./boat-class-list.component.css']
})
export class BoatClassListComponent extends BaseListComponent<BoatClass> {
  protected static readonly tabName = 'boat-class-list';
  displayedColumns = ['select', 'name', 'yardstick'];

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( boatClassFacade, routerFacade, route, activeTabService, subscriptionService, BoatClassListComponent.tabName );
  }

  // event handling methods

  // protected, private helper methods
}
