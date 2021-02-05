import { Component, ViewEncapsulation } from '@angular/core';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { BoatFacade } from '@sailrc/boat/domain';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BoatFeatureFacade } from '../boat-feature.facade';

@Component({
  selector: 'sailrc-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatListComponent extends BaseListComponent<Boat>{
  protected static readonly tabName = 'boat-list';
  displayedColumns = ['select', 'sailNumber', 'boatClass', 'name'];

  constructor(
    protected boatClassFacade: BoatFacade,
    protected boatFeatureFacade: BoatFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( boatClassFacade, boatFeatureFacade, route, activeTabService, subscriptionService, BoatListComponent.tabName );
  }

  // event handling methods

  // protected, private helper methods
}
