import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Registration } from '@sailrc/race/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { IRaceFeatureState } from '../../store/race-feature.reducer';
import { RegistrationFeatureFacade } from '@sailrc/race/feature';
import { Observable } from 'rxjs';
import { Boat, BoatFacade } from '@sailrc/boat/domain';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { filter, map, take } from 'rxjs/operators';
import { BoatFeatureFacade } from '@sailrc/boat/feature';
import { SailorFeatureFacade } from '@sailrc/sailor/feature';

@Component({
  selector: 'sailrc-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})

export class RegistrationDetailsComponent extends BaseFormComponent<Registration> {
  boats$: Observable<Boat[]>;
  sailors$: Observable<Sailor[]>;
  private boatName: string;
  private boatType: string;
  private raceId: string;
  private sailNumber: string;
  private skipperName: string;

  constructor(
    protected registrationFeatureFacade: RegistrationFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IRaceFeatureState>,
    private boatFacade: BoatFacade,
    private boatFeatureFacade: BoatFeatureFacade,
    private sailorFacade: SailorFacade,
    private sailorFeatureFacade: SailorFeatureFacade
  ) {
    super( registrationFeatureFacade, routerFacade, route, activeTabService, componentDestroyService );
  }

  // region life cycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.boatFacade.loadAll();
    this.boats$ = this.boatFacade.all$;
    this.sailorFacade.loadAll();
    this.sailors$ = this.sailorFacade.all$;
    this.determineRaceId();
    this.defaultCriteria = this.raceId;
  }
  // endregion

  // region event handling methods
  protected adjustEntity( entity: Registration ) {
    return {...entity, boatName: this.boatName, boatType: this.boatType, sailNumber: this.sailNumber, skipper: this.skipperName };
  }

  onAddBoat() {
    this.boatFeatureFacade.jumpToDetails( 'new', this.sailorFeatureFacade.currentUrl() );
  }

  onAddSailor() {
    this.sailorFeatureFacade.jumpToDetails( 'new', this.sailorFeatureFacade.currentUrl() );
  }

  onBoatSelected( boatId: string ) {
    this.boats$.pipe(
      map( boats => boats.filter( boat => boat.id == boatId ))
    ).subscribe( boats => {
      this.boatName = boats[0].name;
      this.sailNumber = boats[0].sailNumber;
      this.boatType = boats[0].boatClass;
    });
  }

  onGoToBoat() {
    this.formState$.pipe(
      map( formState => formState.controls.boatId.value ),
      take( 1 )
    ).subscribe( boatId => {
      this.boatFeatureFacade.jumpToDetails( boatId, this.boatFeatureFacade.currentUrl() );
    })
  }

  onGoToSailor() {
    this.formState$.pipe(
      map( formState => formState.controls.sailorId.value ),
      take( 1 )
    ).subscribe( sailorId => {
      this.sailorFeatureFacade.jumpToDetails( sailorId, this.sailorFeatureFacade.currentUrl() );
    })
  }

  onSailorSelected( sailorId: string ) {
    this.sailors$.pipe(
      map( sailors => sailors.filter( sailor => sailor.id == sailorId ))
    ).subscribe( sailors => {
      this.skipperName = sailors[0].lastName + ', ' + sailors[0].firstName;
    });
  }
  // endregion

  // public accessors and mutators

  // region protected, private helper methods
  protected determineRaceId() {
    this.raceId = this.route.snapshot.data[ 'race' ].id;
  }
  // endregion
}
