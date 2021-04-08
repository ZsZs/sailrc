import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { LapFacade, Participant, ParticipantFacade, Registration } from '@sailrc/race/domain';
import { ActivatedRoute } from '@angular/router';
import { RegistrationFeatureFacade } from '@sailrc/race/feature';
import { Subscription } from 'rxjs';
import { first, map, take, takeUntil, tap } from 'rxjs/operators';
import { RegistrationSourceService } from './registration-source.service';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';
import { RouteStateService } from '@processpuzzle/shared/util';

@Component({
  selector: 'sailrc-registration-source-list',
  templateUrl: './registration-source-list.component.html',
  styleUrls: ['./registration-source-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegistrationSourceListComponent extends BaseListComponent<Registration> implements OnDestroy, OnInit {
  private _displayedColumns = ['sailNumber', 'boatName', 'boatType', 'skipper', 'isParticipant'];
  private lapId: string;
  private readonly registrationFacade: IEntityFacade<Registration>;

  constructor(
    protected registrationFeatureFacade: RegistrationFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private routeState: RouteStateService,
    private lapFacade: LapFacade,
    private participantFacade: ParticipantFacade,
    private registrationSourceService: RegistrationSourceService,
    private subscriptionService: ComponentDestroyService
  ){
    super( registrationFeatureFacade, route, activeTabService, subscriptionService );
    this.registrationFacade = registrationFeatureFacade.entityFacade;
    this.routeState.subscribeToRouteSegments( RegistrationSourceListComponent.name, this.route );
  }

  // region angular lifecycle hooks
  ngOnDestroy() {
    super.ngOnDestroy();
    this.routeState.unsubscribeFromRouteSegments( RegistrationSourceListComponent.name );
  }

  ngOnInit() {
    super.ngOnInit();
    this.determineLapId();
  }

  // endregion

  // region component event hooks
  protected navigateToDetailsForm() {
    // suppress base class behaviour
  }

  onChangeIsParticipant( registration: Registration ) {
    if( !registration.isParticipant ) this.createParticipant( registration );
    else this.deleteParticipant( registration );
  }
  // endregion

  // region protected, private helper methods
  private createParticipant( registration: Registration ) {
    const participant = new Participant();
    participant.registrationId = registration.id;
    participant.raceId = registration.raceId;
    participant.lapId = this.lapId;
    participant.sailNumber = registration.sailNumber;
    participant.boatName = registration.boatName;
    participant.boatType = registration.boatType;
    participant.skipper = registration.skipper;

    this.participantFacade.create( participant, { raceId: registration.raceId, lapId: this.lapId } );
  }

  private deleteParticipant( registration: Registration ) {
    this.participantFacade.all$.pipe(
      map( participants => participants.filter( participant => participant.registrationId == registration.id )),
      take( 1 )
    ).subscribe( participants => {
      const participant = participants[0];
      this.participantFacade.delete( participant, { raceId: participant.raceId, lapId: participant.lapId });
    });
  }

  private determineLapId() {
    this.lapFacade.current$.pipe(
      first(),
      map( lap => this.lapId = lap.id )
    ).subscribe();
  }

  protected loadAllEntities() {
    this.loadRegistrations();
    this.loadParticipants();
  }

  private loadParticipants() {
    this.lapFacade.current$.pipe(
      takeUntil( this.onDestroy$ ),
      tap( lap => this.participantFacade.loadAll( { raceId: lap.raceId, lapId: lap.id } ) )
    ).subscribe();
  }

  private loadRegistrations() {
    const raceIdPathVariable = this.registrationFeatureFacade.raceIdPathVariable;
    const raceId = this.route.snapshot.params[ raceIdPathVariable ];
    this.entityFacade.loadAll( raceId );
  }

  protected subscribeToSourceData(): Subscription {
    return this.registrationSourceService.loadAll().pipe( takeUntil( this.onDestroy$ )).subscribe( ( data: Registration[] ) => {
      this.dataSource.data = data;
    });
  }
  // endregion

  // region properties
  get displayedColumns() {
    return this._displayedColumns;
  }
  // endregion
}
