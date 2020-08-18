import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, tap } from 'rxjs/operators';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { RouterFacade } from '@sailrc/shared/util';
import { IBoatFeatureState, getDetailsForm } from '../store/boat-feature.reducer';
import { ActiveTabService, ComponentDestroyService } from '@sailrc/shared/widgets';
import { BaseFormComponent } from '@sailrc/shared/base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent extends BaseFormComponent<BoatClass> implements OnDestroy {

  constructor(
    protected boatClassFacade: BoatClassFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatFeatureState>,
    protected routerFacade: RouterFacade )
  {
    super( boatClassFacade, routerFacade, route, activeTabService, componentDestroyService, store, getDetailsForm, 'boat-class-details' );
  }

  // event handling methods

  // public accessors and mutators

  // protected, private helper methods
}
