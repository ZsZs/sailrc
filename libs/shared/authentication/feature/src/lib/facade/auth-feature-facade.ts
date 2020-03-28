import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService, SpinnerService } from '@sailrc/shared/widgets';
import { AuthData, AuthDomainFacade } from '@sailrc/shared/authentication/domain';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthFeatureFacade {
  private authStateSubscription: Subscription;

  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private spinnerService: SpinnerService,
    private authDomainFacade: AuthDomainFacade ) {}

  initAuthListener(): Observable<any> {
    return this.authDomainFacade.getAuthState().pipe(
      tap( user => {
        if ( user ) {
          this.authSuccess( user.email, user.userId );
        } else {
          this.authFailed();
        }
    }));
  }

  isAuthenticated(): Observable<boolean> {
    return this.authDomainFacade.isAuthenticated();
  }

  login( authData: AuthData ) {
    this.spinnerService.startLoading();
    this.authDomainFacade.signInWithEmailAndPassword( authData )
      .then( authResponse => {
        this.authSuccess( authResponse.user.email, authResponse.user.uid );
      })
      .catch( error => {
        this.spinnerService.stopLoading();
        this.snackBarService.showSnackbar( error.message, null, 5000 );
        this.authFailed();
      });
  }

  logout() {
    this.authDomainFacade.signOut();
    this.authDomainFacade.setUnAuthenticated();
    this.router.navigate(['/']);
  }

  registerUser( authData: AuthData ) {
    this.spinnerService.startLoading();
    this.authDomainFacade.createUserWithEmailAndPassword( authData )
      .then( authResponse => {
        this.authSuccess( authResponse.user.email, authResponse.user.uid );
      })
      .catch( error => {
        this.spinnerService.stopLoading();
        this.snackBarService.showSnackbar( error.message, null, 5000 );
      });
  }

  // protected, private helper methods
  private authFailed() {
    this.authDomainFacade.setUnAuthenticated();
    this.router.navigate(['/login']);
  }

  private authSuccess( email: string, userId: string ) {
    this.spinnerService.stopLoading();
    this.authDomainFacade.setAuthenticated( email, userId );
    this.router.navigate(['/']);
  }
}
