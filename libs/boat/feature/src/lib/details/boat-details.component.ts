import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import firebase from 'firebase';
import User = firebase.User;
import { uriNameOfEntity } from '@briebug/ngrx-auto-entity';

import { BaseFormComponent } from '@processpuzzle/shared/base';
import { Boat } from '@sailrc/boat/domain';
import { RouterFacade } from '@processpuzzle/shared/util';
import { ActiveTabService, ComponentDestroyService } from '@processpuzzle/shared/base';
import { BoatFeatureFacade } from '../boat-feature.facade';
import { IBoatFeatureState } from '../boat-feature.reducer';
import { BoatClass, BoatClassFacade } from '@sailrc/boat-class/domain';
import { AuthDomainFacade } from '@processpuzzle/authentication/domain';
import { BoatClassFeatureFacade } from '@sailrc/boat-class/feature';

@Component({
  selector: 'sailrc-boat-detail',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BoatDetailsComponent extends BaseFormComponent<Boat> implements OnInit{
  boatClasses$: Observable<BoatClass[]>;
  photoFolder: string;
  showBoatPicture = false;
  user: User;

  constructor(
    private boatClassFacade: BoatClassFacade,
    protected boatFeatureFacade: BoatFeatureFacade,
    protected routerFacade: RouterFacade,
    protected route: ActivatedRoute,
    protected activeTabService: ActiveTabService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<IBoatFeatureState>,
    private boatClassFeatureFacade: BoatClassFeatureFacade,
    private authFacade: AuthDomainFacade
) {
  super( boatFeatureFacade, routerFacade, route, activeTabService, componentDestroyService );
}

  // region angular lifecycle hooks
  ngOnInit() {
    super.ngOnInit();
    this.boatClassFacade.loadAll();
    this.boatClasses$ = this.boatClassFacade.all$;
    this.subscribeToUser();
    this.determinePhotoFolder();
  }
  // endregion

  // region event handling methods
  onAddBoatClass() {
    this.boatClassFeatureFacade.jumpToDetails( 'new', this.boatFeatureFacade.currentUrl() );
  }

  onAvatar() {
    this.showBoatPicture = true;
  }

  // public accessors and mutators

  // region protected, private helper methods
  private determinePhotoFolder() {
    const email = this.user ? this.user.email : 'test@sailrc.com';
    this.photoFolder = uriNameOfEntity( Boat ) + '/' + email;
  }

  private subscribeToUser() {
    this.authFacade.getAuthState().pipe( takeUntil( this.onDestroy$ ) ).subscribe( ( user ) => ( this.user = user) );
  }
  // endregion
}
