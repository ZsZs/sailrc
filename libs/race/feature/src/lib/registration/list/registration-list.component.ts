import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration } from '@sailrc/race/domain';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { BaseListComponent } from '@processpuzzle/shared/base';
import { RegistrationFeatureFacade } from '../registration-feature.facade';

@Component({
  selector: 'sailrc-race-registration',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent extends BaseListComponent<Registration> implements OnDestroy, OnInit {
  private _displayedColumns = ['sailNumber', 'boatName', 'boatType', 'skipper'];

  constructor(
    protected registrationFeatureFacade: RegistrationFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService
  ) {
    super(registrationFeatureFacade, route, activeTabService, subscriptionService);
  }

  // region protected, private helper methods
  protected loadAllEntities() {
    const raceIdPathVariable = this.registrationFeatureFacade.raceIdPathVariable;
    const raceId = this.route.snapshot.params[raceIdPathVariable];
    this.entityFacade.loadAll(raceId);
  }
  // endregion

  // region properties
  get displayedColumns() {
    return this._displayedColumns;
  }
  // endregion
}
