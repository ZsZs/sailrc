import { Component, ViewEncapsulation } from '@angular/core';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { SailingPlace } from '@sailrc/sailing-place/domain';
import { SailingPlaceFeatureFacade } from '../sailing-place-feature.facade';

@Component({
  selector: 'sailrc-sailing-place-tabs',
  templateUrl: './sailing-place-tabs.component.html',
  styleUrls: ['./sailing-place-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SailingPlaceTabsComponent extends BaseTabsComponent<SailingPlace>{

  constructor(
    protected boatFeatureFacade: SailingPlaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute ) {
    super( boatFeatureFacade, activeTabService, route );
  }
}
