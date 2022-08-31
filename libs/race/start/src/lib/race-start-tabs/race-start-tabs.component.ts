import { Component, ViewEncapsulation } from '@angular/core';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { Lap } from '@sailrc/race/domain';
import { RaceStartFeatureFacade } from '../race-start-feature.facade';
import { ActiveTabService } from '@processpuzzle/shared/base';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sailrc-race-start-tabs',
  templateUrl: './race-start-tabs.component.html',
  styleUrls: ['./race-start-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceStartTabsComponent extends BaseTabsComponent<Lap> {
  constructor(protected raceStartFeatureFacade: RaceStartFeatureFacade, protected activeTabsService: ActiveTabService, protected route: ActivatedRoute) {
    super(raceStartFeatureFacade, activeTabsService, route);
  }

  // region event handling methods
  onCountdown() {
    const currentUrl = this.currentUrl();
    const timerPath = this.levelUpUrl(currentUrl) + '/list';
    this.raceStartFeatureFacade.navigateTo(timerPath, currentUrl);
  }

  onCapture() {
    const currentUrl = this.currentUrl();
    const capturePath = this.levelUpUrl(currentUrl) + '/capture';
    this.raceStartFeatureFacade.navigateTo(capturePath, currentUrl);
  }
  // endregion
}
