import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { SailingPlace } from '@sailrc/sailing-place/domain';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { SailingPlaceFeatureFacade } from '../sailing-place-feature.facade';

@Component({
  selector: 'sailrc-sailing-place-list',
  templateUrl: './sailing-place-list.component.html',
  styleUrls: ['./sailing-place-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SailingPlaceListComponent extends BaseListComponent<SailingPlace>{
  displayedColumns = ['select', 'name'];

  constructor(
    protected sailingPlaceFeatureFacade: SailingPlaceFeatureFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService ) {
    super( sailingPlaceFeatureFacade, route, activeTabService, componentDestroyService );
  }
}
