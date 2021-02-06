import { Component, ViewEncapsulation } from '@angular/core';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BoatFeatureFacade } from '../boat-feature.facade';

@Component({
  selector: 'sailrc-boat-tabs',
  templateUrl: './boat-tabs.component.html',
  styleUrls: ['./boat-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatTabsComponent extends BaseTabsComponent<Boat>{

  constructor(
    protected boatFeatureFacade: BoatFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( boatFeatureFacade, activeTabService, route );
  }

  // protected, private helper methods
}
