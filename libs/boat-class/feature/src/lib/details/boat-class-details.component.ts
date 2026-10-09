import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoatClass } from '@sailrc/boat-class/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, BaseFormComponent, ComponentDestroyService } from '@processpuzzle/shared/base';
import { BoatClassFeatureFacade } from '../facade/boat-class-feature.facade';
import { ActivatedRoute } from '@angular/router';
import { IBoatClassFeatureState } from '../store/boat-class-feature.reducer';
import { uriNameOfEntity } from '@briebug/ngrx-auto-entity';

@Component({
  selector: 'sailrc-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css'],
})
export class BoatClassDetailsComponent extends BaseFormComponent<BoatClass> implements OnInit {
  classSymbolFolder: string;
  showClassSymbol = false;

  constructor(
    protected boatClassFormFacade: BoatClassFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatClassFeatureState>
  ) {
    super(boatClassFormFacade, routerFacade, route, activeTabService, componentDestroyService);
  }

  // region angular life cycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.determineSymbolFolder();
  }
  // endregion

  // region event handling methods
  onSymbol() {
    this.showClassSymbol = true;
  }
  // endregion

  // public accessors and mutators
  // endregion

  // protected, private helper methods
  private determineSymbolFolder() {
    this.classSymbolFolder = uriNameOfEntity(BoatClass);
  }
  // endregion
}
