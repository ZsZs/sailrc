import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Race, RaceFacade } from '@sailrc/race/domain';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { RaceFeatureFacade } from '../race-feature.facade';

@Component({
  selector: 'sailrc-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent extends BaseListComponent<Race>{
  protected static readonly tabName = 'race-list';
  displayedColumns = ['select', 'title', 'fromDate', 'toDate', 'country', 'place', 'organizer', 'state'];

  constructor(
    protected raceFacade: RaceFacade,
    protected raceFeatureFacade: RaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private router: Router,
    private subscriptionService: ComponentDestroyService ) {
    super( raceFacade, raceFeatureFacade, route, activeTabService, subscriptionService, RaceListComponent.tabName );
  }

  // event handling methods

  // public accessors and mutators

  registerToRace() {
    this.router.navigateByUrl( '/race/' + this.selection.selected[0].id + '/registrations' );
  }

  // protected, private helper methods
}
