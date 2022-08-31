import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { Sailor } from '@sailrc/sailor/domain';
import { Component } from '@angular/core';
import { SailorFeatureFacade } from '../sailor-feature.facade';

@Component({
  selector: 'sailrc-sailor-list',
  templateUrl: './sailor-list.component.html',
  styleUrls: ['./sailor-list.component.css']
})
export class SailorListComponent extends BaseListComponent<Sailor>{
  displayedColumns = ['select', 'firstName', 'lastName', 'yachtClub', 'boat'];

  constructor(
    protected sailorFeatureFacade: SailorFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( sailorFeatureFacade, route, activeTabService, subscriptionService );
  }

  // event handling methods

  // protected, private helper methods
}
