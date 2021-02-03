import { Component, OnDestroy, OnInit } from '@angular/core';
import { Race, RaceFacade, Registration, RegistrationFacade } from '@sailrc/race/domain';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { BaseUrlSegments, RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sailrc-race-tabs',
  templateUrl: './race-tabs.component.html',
  styleUrls: ['./race-tabs.component.css']
})
export class RaceTabsComponent extends BaseTabsComponent<Race> {
  selectedRaceId: string;
  selectedRegistrationId: string;

  constructor(
    protected raceFacade: RaceFacade,
    private registrationFacade: RegistrationFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private router: Router ) {
    super( raceFacade, activeTabService, routerFacade, route );
  }

  // event handling methods
  ngOnInit() {
    super.ngOnInit();
    this.determineSelectedRaceId();
    this.determineSelectedRegistrationId();
  }

  showRegistrationDetails() {
    this.routerFacade.routerGo( [this.selectedEntityId + '/registration/' + this.selectedRegistrationId + '/' + BaseUrlSegments.DetailsForm], {}, { relativeTo: this.route } )
  }

  showRegistrations() {
    this.routerFacade.routerGo( [this.selectedEntityId + '/registration/' + BaseUrlSegments.ListForm], {}, { relativeTo: this.route } )
  }

  // protected, private helper methods
  determineSelectedRaceId() {
    this.raceFacade.current$.pipe( takeUntil( this.onDestroy$ )).subscribe( race => {
      race ? this.selectedRaceId = race.id : undefined;
    });
  }

  private determineSelectedRegistrationId() {
    this.registrationFacade.current$.pipe( takeUntil( this.onDestroy$ )).subscribe( registration => {
      registration ? this.selectedRegistrationId = registration.id : undefined;
    });
  }
}
