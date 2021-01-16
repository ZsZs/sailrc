import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { BoatClassFeatureFacade } from '../facade/boat-class-feature.facade';
import { ActivatedRoute } from '@angular/router';
import { IBoatClassFeatureState } from '../store/boat-class-feature.reducer';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent extends BaseFormComponent<BoatClass> {

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected boatClassFormFacade: BoatClassFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatClassFeatureState>,
  ) {
    super( boatClassFacade, boatClassFormFacade, routerFacade, route, activeTabService, componentDestroyService, 'boat-class-details' );
  }

  // event handling methods

  // public accessors and mutators

  // protected, private helper methods
}
