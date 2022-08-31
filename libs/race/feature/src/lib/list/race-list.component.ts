import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Race } from '@sailrc/race/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { RaceFeatureFacade } from '@sailrc/race/shared';

@Component({
  selector: 'sailrc-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css'],
})
export class RaceListComponent extends BaseListComponent<Race> {
  displayedColumns = ['select', 'title', 'fromDate', 'toDate', 'country', 'place', 'organizer', 'state'];

  constructor(
    protected raceFeatureFacade: RaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private router: Router,
    private subscriptionService: ComponentDestroyService
  ) {
    super(raceFeatureFacade, route, activeTabService, subscriptionService);
  }

  // event handling methods

  // public accessors and mutators

  registerToRace() {
    this.router.navigateByUrl('/race/' + this.selection.selected[0].id + '/registrations');
  }

  // protected, private helper methods
}
