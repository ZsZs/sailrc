import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Registration, RegistrationFacade } from '@sailrc/race/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { BaseListComponent } from '@processpuzzle/shared/base';

@Component({
  selector: 'sailrc-race-registration',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})

export class RegistrationListComponent extends BaseListComponent<Registration> implements OnDestroy, OnInit {
  protected static readonly tabName = 'registration-list';
  displayedColumns = ['sailNumber', 'boatName', 'boatType', 'skipper'];

  constructor(
    protected registrationFacade: RegistrationFacade,
    protected routerFacade: RouterFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute,
    private subscriptionService: ComponentDestroyService ) {
    super( registrationFacade, routerFacade, route, activeTabService, subscriptionService, RegistrationListComponent.tabName );
  }

  // protected, private helper methods
  protected loadAllEntities() {
    const raceId = this.route.snapshot.params[ 'raceId' ];
    this.registrationFacade.loadAll( raceId );
  }
}
