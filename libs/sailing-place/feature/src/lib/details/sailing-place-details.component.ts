import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { SailingPlace } from '@sailrc/sailing-place/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { Store } from '@ngrx/store';
import { ISailingPlaceFeatureState } from '../sailing-place-feature.reducer';
import { SailingPlaceFeatureFacade } from '../sailing-place-feature.facade';

@Component({
  selector: 'sailrc-sailing-place-details',
  templateUrl: './sailing-place-details.component.html',
  styleUrls: ['./sailing-place-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SailingPlaceDetailsComponent extends BaseFormComponent<SailingPlace> {

  constructor(
    protected boatFeatureFacade: SailingPlaceFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<ISailingPlaceFeatureState>
  ) {
    super( boatFeatureFacade, routerFacade, route, activeTabService, componentDestroyService );
  }
}
