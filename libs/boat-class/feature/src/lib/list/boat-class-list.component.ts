import { Component } from '@angular/core';

import { BoatClass } from '@sailrc/boat-class/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { ActivatedRoute } from '@angular/router';
import { BoatClassFeatureFacade } from '../facade/boat-class-feature.facade';

@Component({
  selector: 'sailrc-boat-class-list',
  templateUrl: './boat-class-list.component.html',
  styleUrls: ['./boat-class-list.component.css'],
})
export class BoatClassListComponent extends BaseListComponent<BoatClass> {
  private _displayedColumns = ['select', 'name', 'yardstick'];

  constructor(
    protected boatClassFeatureFacade: BoatClassFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService
  ) {
    super(boatClassFeatureFacade, route, activeTabService, subscriptionService);
  }

  // event handling methods

  // region protected, private helper methods
  get displayedColumns(): string[] {
    return this._displayedColumns;
  }
  // endregion
}
