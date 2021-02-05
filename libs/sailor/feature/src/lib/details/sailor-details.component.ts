import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import firebase from 'firebase';
import User = firebase.User;
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/widgets';
import { Store } from '@ngrx/store';
import { BaseFormComponent } from '@processpuzzle/shared/base';
import { Sailor, SailorFacade } from '@sailrc/sailor/domain';
import { Component, OnInit } from '@angular/core';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { SailorFeatureFacade } from '../sailor-feature.facade';
import { ISailorFeatureState } from '../store/sailor-feature.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthDomainFacade } from '@processpuzzle/authentication/domain';
import { uriNameOfEntity } from '@briebug/ngrx-auto-entity';
import { Boat, BoatFacade } from '@sailrc/boat/domain';
import { BoatFeatureFacade } from '@sailrc/boat/feature';
import { YachtClubFeatureFacade } from '@sailrc/yacht-club/feature';

@Component({
  selector: 'sailrc-sailor-details',
  templateUrl: './sailor-details.component.html',
  styleUrls: ['./sailor-details.component.css']
})
export class SailorDetailsComponent extends BaseFormComponent<Sailor> implements OnInit {
  boats$: Observable<Boat[]>;
  showProfilePicture = false;
  photoFolder: any;
  yachtClubs$: Observable<YachtClub[]>;
  user: User;

  constructor(
    protected sailorFacade: SailorFacade,
    protected sailorFeatureFacade: SailorFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<ISailorFeatureState>,
    private yachtClubFacade: YachtClubFacade,
    private yachtClubFeatureFacade: YachtClubFeatureFacade,
    private boatFacade: BoatFacade,
    private boatFeatureFacade: BoatFeatureFacade,
    private authFacade: AuthDomainFacade,
    private readonly snackBar: MatSnackBar
  ) {
    super( sailorFacade, sailorFeatureFacade, routerFacade, route, activeTabService, componentDestroyService, 'sailor-details' );
  }

  // angular lifecycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.yachtClubFacade.loadAll();
    this.yachtClubs$ = this.yachtClubFacade.all$;
    this.boatFacade.loadAll();
    this.boats$ = this.boatFacade.all$;
    this.subscribeToUser();
    this.determinePhotoFolder();
  }

  // region event handling methods
  onAddYacthClub() {
    this.yachtClubFeatureFacade.navigateToDetails( 'new', this.sailorFeatureFacade.currentUrl() );
  }

  onAddBoat() {
    this.boatFeatureFacade.navigateToDetails( 'new', this.sailorFeatureFacade.currentUrl() );
  }

  onAvatar() {
    this.showProfilePicture = true;
  }
  // endregion

  // region protected, private helper methods
  private determinePhotoFolder() {
    const email = this.user ? this.user.email : 'test@sailrc.com';
    this.photoFolder = uriNameOfEntity( Sailor ) + '/' + email;
  }

  private subscribeToUser() {
    this.authFacade.getAuthState().pipe( takeUntil( this.onDestroy$ ) ).subscribe( ( user ) => ( this.user = user) );
  }
  // endregion
}
