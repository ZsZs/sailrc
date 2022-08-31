import { combineLatest, Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActivatedRoute } from '@angular/router';
import { ActiveTabService, BaseFormComponent, ComponentDestroyService } from '@processpuzzle/shared/base';
import { Store } from '@ngrx/store';
import { Sailor } from '@sailrc/sailor/domain';
import { Component, OnInit } from '@angular/core';
import { YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { SailorFeatureFacade } from '../sailor-feature.facade';
import { ISailorFeatureState } from '../store/sailor-feature.reducer';
import { AuthDomainFacade, User } from '@processpuzzle/authentication/domain';
import { uriNameOfEntity } from '@briebug/ngrx-auto-entity';
import { Boat, BoatFacade } from '@sailrc/boat/domain';
import { BoatFeatureFacade } from '@sailrc/boat/feature';
import { YachtClubFeatureFacade } from '@sailrc/yacht-club/feature';

@Component({
  selector: 'sailrc-sailor-details',
  templateUrl: './sailor-details.component.html',
  styleUrls: ['./sailor-details.component.css'],
})
export class SailorDetailsComponent extends BaseFormComponent<Sailor> implements OnInit {
  boats$: Observable<Boat[]>;
  showProfilePicture = false;
  photoFolder: string;
  yachtClubs$: Observable<YachtClub[]>;
  user: User;

  constructor(
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
    private authFacade: AuthDomainFacade
  ) {
    super(sailorFeatureFacade, routerFacade, route, activeTabService, componentDestroyService);
  }

  // region angular lifecycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.yachtClubFacade.loadAll();
    this.yachtClubs$ = this.yachtClubFacade.all$;
    this.boatFacade.loadAll();
    this.boats$ = this.boatFacade.all$;
    this.subscribeToUser();
    this.determinePhotoFolder();
  }
  // endregion

  // region event handling methods
  onAddBoat() {
    this.boatFeatureFacade.jumpToDetails('new', this.sailorFeatureFacade.currentUrl());
  }

  onAddYacthClub() {
    this.yachtClubFeatureFacade.jumpToDetails('new', this.sailorFeatureFacade.currentUrl());
  }

  onAvatar() {
    this.showProfilePicture = true;
  }

  onGoToBoat() {
    this.formState$
      .pipe(
        map((formState) => formState.controls.boatId.value),
        take(1)
      )
      .subscribe((boatId) => {
        this.boatFeatureFacade.jumpToDetails(boatId, this.sailorFeatureFacade.currentUrl());
      });
  }

  onGoToYacthClub() {
    this.formState$
      .pipe(
        map((formState) => formState.controls.yachtClubId.value),
        take(1)
      )
      .subscribe((yachtClubId) => {
        this.yachtClubFeatureFacade.jumpToDetails(yachtClubId, this.sailorFeatureFacade.currentUrl());
      });
  }
  // endregion

  // region protected, private helper methods
  private determinePhotoFolder() {
    const email = this.user ? this.user.email : 'test@sailrc.com';
    this.photoFolder = uriNameOfEntity(Sailor) + '/' + email;
  }

  protected subscribeToLoading() {
    this.isLoading$ = combineLatest(this.entityFacade.isLoading$, this.yachtClubFacade.isLoading$, this.boatFacade.isLoading$).pipe(
      map(([sailorIsLoading, yachtClubIsLoading, boatIsLoading]) => sailorIsLoading || yachtClubIsLoading || boatIsLoading)
    );
  }

  private subscribeToUser() {
    this.authFacade
      .getAuthState()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user) => ( this.user = {
        userId: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
  }
  // endregion
}
