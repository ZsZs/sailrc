import { BoatFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { Component } from '@angular/core';
import { SailorFeatureFacade } from '../sailor-feature.facade';

@Component({
  selector: 'sailrc-sailor-list',
  templateUrl: './sailor-list.component.html',
  styleUrls: ['./sailor-list.component.css']
})
export class SailorListComponent extends BaseListComponent<Sailor>{
  protected static readonly tabName = 'sailor-list';
  displayedColumns = ['select', 'firstName', 'lastName', 'yachtClub', 'boat'];

  constructor(
    protected sailorFacade: SailorFacade,
    protected sailorFeatureFacade: SailorFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( sailorFacade, sailorFeatureFacade, route, activeTabService, subscriptionService, SailorListComponent.tabName );
  }

  // event handling methods

  // protected, private helper methods
}
