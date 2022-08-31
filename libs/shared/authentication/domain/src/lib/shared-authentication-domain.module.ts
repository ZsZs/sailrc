import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './integration/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { authReducer, AuthState } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

export const AUTH_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AuthState>>('auth reducer');

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,
    StoreModule.forFeature('auth', AUTH_REDUCER_TOKEN ),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    { provide: AUTH_REDUCER_TOKEN, useValue: authReducer }
  ]
})
export class SharedAuthenticationDomainModule {
  static forRoot(): ModuleWithProviders<SharedAuthenticationDomainModule> {
    return {
      ngModule: SharedAuthenticationDomainModule,
      providers: [AuthService]
    }
  }
}
