import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoatClass } from '@sailrc/boat-class/domain';
import { ActiveTabService, BaseTabsComponent } from '@processpuzzle/shared/base';
import { BoatClassFeatureFacade } from '../facade/boat-class-feature.facade';

@Component({
  selector: 'sailrc-boat-class-tabs',
  templateUrl: './boat-class-tabs.component.html',
  styleUrls: ['./boat-class-tabs.component.css'],
})
export class BoatClassTabsComponent extends BaseTabsComponent<BoatClass> {
  constructor(protected boatClassFeatureFacade: BoatClassFeatureFacade, protected activeTabService: ActiveTabService, protected route: ActivatedRoute) {
    super(boatClassFeatureFacade, activeTabService, route);
  }

  // protected, private helper methods
}
