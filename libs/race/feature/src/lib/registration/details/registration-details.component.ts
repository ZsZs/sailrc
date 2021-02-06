import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Registration, RegistrationFacade } from '@sailrc/race/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { IRaceFeatureState } from '../../store/race-feature.reducer';
import { RegistrationFeatureFacade } from '../registration-feature.facade';

@Component({
  selector: 'sailrc-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})

export class RegistrationDetailsComponent extends BaseFormComponent<Registration> {
  private raceId: string;

  constructor(
    protected registrationFeatureFacade: RegistrationFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IRaceFeatureState>,
  ) {
    super( registrationFeatureFacade, routerFacade, route, activeTabService, componentDestroyService );
  }

  // life cycle hooks, event handling
  ngOnInit() {
    super.ngOnInit();
    this.determineRaceId();
    this.defaultCriteria = this.raceId;
  }

  // public accessors and mutators

  // protected, private helper methods
  protected determineRaceId() {
    this.raceId = this.route.snapshot.data[ 'race' ].id;
  }
}
