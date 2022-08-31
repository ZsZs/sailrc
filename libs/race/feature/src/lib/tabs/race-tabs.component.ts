import { Component, OnInit } from '@angular/core';
import { Race, Registration, RegistrationFacade } from '@sailrc/race/domain';
import { ActivatedRoute } from '@angular/router';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { BaseUrlSegments, RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService } from '@processpuzzle/shared/base';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RaceFeatureFacade } from '@sailrc/race/shared';

@Component({
  selector: 'sailrc-race-tabs',
  templateUrl: './race-tabs.component.html',
  styleUrls: ['./race-tabs.component.css'],
})
export class RaceTabsComponent extends BaseTabsComponent<Race> implements OnInit {
  readonly registrationDetailsTabName: string;
  readonly registrationListTabName: string;
  selectedRaceId: string;
  selectedRegistrationId: string;
  selectedRegistration$: Observable<Registration>;

  constructor(
    private registrationFacade: RegistrationFacade,
    private routerFacade: RouterFacade,
    protected raceFeatureFacade: RaceFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    super(raceFeatureFacade, activeTabService, route);
    this.registrationDetailsTabName = 'Registration-details';
    this.registrationListTabName = 'Registration-list';
    this.selectedRegistration$ = this.registrationFacade.current$;
  }

  // region angular life-cycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.determineSelectedRaceId();
    this.determineSelectedRegistrationId();
  }
  // endregion

  // region event handling methods
  showRegistrationDetails() {
    this.routerFacade.routerGo([this.selectedEntityId + '/registration/' + this.selectedRegistrationId + '/' + BaseUrlSegments.DetailsForm], {}, { relativeTo: this.route });
  }

  showRegistrations() {
    this.routerFacade.routerGo([this.selectedEntityId + '/registration/' + BaseUrlSegments.ListForm], {}, { relativeTo: this.route });
  }
  // endregion

  // region protected, private helper methods
  determineSelectedRaceId() {
    this.entityFacade.current$.pipe(takeUntil(this.onDestroy$)).subscribe((race) => {
      race ? (this.selectedRaceId = race.id) : undefined;
    });
  }

  private determineSelectedRegistrationId() {
    this.registrationFacade.current$.pipe(takeUntil(this.onDestroy$)).subscribe((registration) => {
      registration ? (this.selectedRegistrationId = registration.id) : undefined;
    });
  }
  // endregion
}
