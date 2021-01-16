import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { Store } from '@ngrx/store';
import { BoatFeatureFacade } from '../boat-feature.facade';
import { BoatFacade } from '@sailrc/boat/domain';
import { IBoatFeatureState } from '../boat-feature.reducer';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'sailrc-boat-detail',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatDetailsComponent extends BaseFormComponent<Boat> implements OnInit{
  boatClasses$: Observable<BoatClass[]>;

  constructor(
    protected boatFacade: BoatFacade,
    private boatClassFacade: BoatClassFacade,
    protected boatFormFacade: BoatFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatFeatureState>,
) {
  super( boatFacade, boatFormFacade, routerFacade, route, activeTabService, componentDestroyService, 'boat-details' );
}

  // event handling methods
  ngOnInit() {
    super.ngOnInit();
    this.boatClassFacade.loadAll();
    this.boatClasses$ = this.boatClassFacade.all$;
  }

  // public accessors and mutators

  // protected, private helper methods
}
