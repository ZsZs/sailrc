import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@sailrc/shared/util';
import { getDetailsForm, IBoatFeatureState } from '../store/boat-feature.reducer';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { BaseFormComponent } from '@sailrc/shared/base';
import { BoatClassFeatureFacade } from '../facade/BoatClassFeatureFacade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent extends BaseFormComponent<BoatClass> implements OnDestroy {

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected boatClassFormFacade: BoatClassFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatFeatureState>,
  ) {
    super( boatClassFacade, boatClassFormFacade, getDetailsForm, routerFacade, route, activeTabService, componentDestroyService, 'boat-class-details' );
  }

  // event handling methods

  // public accessors and mutators

  // protected, private helper methods
}
