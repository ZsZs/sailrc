import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sailor } from '@sailrc/sailor/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { SailorFeatureFacade } from '../sailor-feature.facade';

@Component({
  selector: 'sailrc-sailor-tabs',
  templateUrl: './sailor-tabs.component.html',
  styleUrls: ['./sailor-tabs.component.css']
})
export class SailorTabsComponent extends BaseTabsComponent<Sailor>{
  constructor(
    protected sailorFeatureFacade: SailorFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    super( sailorFeatureFacade, activeTabService, route );
  }

  // protected, private helper methods
}
