import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RaceParticipantFeatureFacade } from '../race-participant-feature.facade';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { LapFacade, Participant, ParticipantFacade } from '@sailrc/race/domain';
import { Observable } from 'rxjs';
import { RouteStateService } from '@processpuzzle/shared/util';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'sailrc-race-participant-list',
  templateUrl: './race-participant-list.component.html',
  styleUrls: ['./race-participant-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceParticipantListComponent extends BaseListComponent<Participant> implements OnDestroy, OnInit {
  private _displayedColumns = ['sailNumber', 'boatName', 'boatType'];
  private lastRouteSegment: Observable<string>;
  private selectedParticipant: Participant;

  constructor(
    protected participantFeatureFacade: RaceParticipantFeatureFacade,
    protected lapFacade: LapFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private participantFacade: ParticipantFacade,
    private routeState: RouteStateService,
    private subscriptionService: ComponentDestroyService
  ) {
    super(participantFeatureFacade, route, activeTabService, subscriptionService);
    this.lastRouteSegment = this.routeState.subscribeToRouteSegments(RaceParticipantListComponent.name, this.route);
  }

  // region angular lifecycle hooks
  ngOnDestroy() {
    super.ngOnDestroy();
    this.routeState.unsubscribeFromRouteSegments(RaceParticipantListComponent.name);
  }

  ngOnInit() {
    super.ngOnInit();
    this.determineSelectedParticipant();
  }
  // endregion

  // region protected, private helper methods
  private determineSelectedParticipant() {
    this.participantFacade.current$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((participant) => participant)
      )
      .subscribe((participant) => {
        this.selectedParticipant = participant;
      });
  }

  protected loadAllEntities() {
    this.lapFacade.current$
      .pipe(
        takeUntil(this.onDestroy$),
        tap((lap) => this.participantFacade.loadAll({ raceId: lap.raceId, lapId: lap.id }))
      )
      .subscribe();
  }

  protected navigateToDetailsForm(entityId: string) {
    const currentUrl = this.route.snapshot['_routerState'].url;
    const raceId = this.selectedParticipant.raceId;
    const registrationId = this.selectedParticipant.registrationId;
    const detailsFormPath = '/race-planning/race/' + raceId + '/registration/' + registrationId + '/details';
    this.entityFormFacade.navigateToDetails(detailsFormPath, currentUrl);
  }
  // endregion

  // region properties
  get displayedColumns() {
    return this._displayedColumns;
  }
  // endregion
}
