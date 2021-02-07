import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BaseFormComponent } from '@processpuzzle/shared/base';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { YachtClub } from '@sailrc/yacht-club/domain';
import { YachtClubFeatureFacade } from '../yacht-club-feature.facade';
import { IYachtClubFeatureState } from '../yacht-club.reducer';
import { uriNameOfEntity } from '@briebug/ngrx-auto-entity';
import { takeUntil } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import { AuthDomainFacade } from '@processpuzzle/authentication/domain';

@Component({
  selector: 'sailrc-yacht-club-details',
  templateUrl: './yacht-club-details.component.html',
  styleUrls: ['./yacht-club-details.component.css']
})
export class YachtClubDetailsComponent extends BaseFormComponent<YachtClub> implements OnInit{
  logoFolder: string;
  showLogo = false;

  constructor(
    protected yachtClubFormFacade: YachtClubFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IYachtClubFeatureState>,
    private authFacade: AuthDomainFacade
  ) {
    super( yachtClubFormFacade, routerFacade, route, activeTabService, componentDestroyService );
  }

  // region angular life cycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.determineLogoFolder();
  }
  // endregion

  // region event handling methods
  onLogo() {
    this.showLogo = true;
  }

  // public accessors and mutators

  // region protected, private helper methods
  private determineLogoFolder() {
    this.logoFolder = uriNameOfEntity( YachtClub );
  }
  // endregion
}
