import { Component } from '@angular/core';

import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BoatClassFeatureFacade } from '../facade/boat-class-feature.facade';

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
    protected boatClassFeatureFacade: BoatClassFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( boatClassFacade, boatClassFeatureFacade, route, activeTabService, subscriptionService, BoatClassListComponent.tabName );
  }

  // event handling methods

  // protected, private helper methods
}
