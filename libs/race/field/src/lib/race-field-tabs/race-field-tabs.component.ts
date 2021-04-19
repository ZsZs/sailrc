import { Component, ViewEncapsulation } from '@angular/core';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { RaceFieldMark } from '@sailrc/race/domain';
import { RaceFieldFeatureFacade } from '../race-field-feature.facade';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-race-field-tabs',
  templateUrl: './race-field-tabs.component.html',
  styleUrls: ['./race-field-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceFieldTabsComponent extends BaseTabsComponent<RaceFieldMark> {

  constructor(
    protected raceFieldFeatureFacade: RaceFieldFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    super( raceFieldFeatureFacade, activeTabService, route );
  }
}
