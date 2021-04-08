import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseTabsComponent } from '@processpuzzle/shared/base';
import { Participant } from '@sailrc/race/domain';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { ActivatedRoute } from '@angular/router';
import { RaceParticipantFeatureFacade } from '../race-participant-feature.facade';

@Component({
  selector: 'sailrc-race-participant-tabs',
  templateUrl: './race-participant-tabs.component.html',
  styleUrls: ['./race-participant-tabs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceParticipantTabsComponent extends BaseTabsComponent<Participant> implements OnInit {

  constructor(
    protected participantFeatureFacade: RaceParticipantFeatureFacade,
    protected activeTabService: ActiveTabService,
    protected route: ActivatedRoute
  ) {
    super( participantFeatureFacade, activeTabService, route );
  }

  // region angular life-cycle hooks
  ngOnInit() {
    super.ngOnInit();
  }
  // endregion

  // region event handling methods
  onRecognizeBoat() {
    const currentUrl = this.currentUrl();
    const capturePath = this.levelUpUrl( currentUrl ) + '/capture';
    this.participantFeatureFacade.navigateToRecognize( capturePath, currentUrl );
  }

  onRegistrationSource() {
    const currentUrl = this.currentUrl();
    const registrationsPath = this.levelUpUrl( currentUrl ) + '/registrations';
    this.participantFeatureFacade.navigateToRecognize( registrationsPath, currentUrl );
  }

  showList() {
    const goToUrl = this.levelUpUrl( this.currentUrl() ) + '/list';
    this.entityFormFacade.navigateToList( goToUrl );
  }
  // endregion
}
