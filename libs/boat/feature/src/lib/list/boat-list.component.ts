import { Component, ViewEncapsulation } from '@angular/core';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { ActivatedRoute } from '@angular/router';
import { BoatFeatureFacade } from '../boat-feature.facade';

@Component({
  selector: 'sailrc-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatListComponent extends BaseListComponent<Boat>{
  displayedColumns = ['select', 'sailNumber', 'boatClass', 'name'];

  constructor(
    protected boatFeatureFacade: BoatFeatureFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService ) {
    super( boatFeatureFacade, route, activeTabService, componentDestroyService );
  }

  // event handling methods

  // protected, private helper methods
}
