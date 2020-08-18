import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';

import { SharedWidgetsModule, SnackBarService } from '@sailrc/shared/widgets';
import { CustomSerializer, RouteStateService, SharedUtilModule } from '@sailrc/shared/util';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SharedAuthenticationFeatureModule } from '@sailrc/shared/authentication/feature';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { SharedAuthenticationDomainModule } from '@sailrc/shared/authentication/domain';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers } from './app.reducer';
import { CommonDependenciesModule } from './common-dependencies.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SidenavListComponent
  ],
  imports: [
    AngularFireModule.initializeApp( environment.firebaseConfig ),
    AngularFirestoreModule,
    AppRoutingModule,
    BreadcrumbModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonDependenciesModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.logger.serverLoggingUrl + '/api/logs',
      level: environment.logger.level,
      serverLogLevel: environment.logger.serverLogLevel,
      disableConsoleLogging: environment.logger.disableConsoleLogging
    }),
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgrxAutoEntityModule.forRoot(),
    SharedAuthenticationDomainModule.forRoot(),
    SharedAuthenticationFeatureModule,
    SharedUtilModule,
    SharedWidgetsModule,
    StoreModule.forRoot( {}, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot( { stateKey: 'router', serializer: CustomSerializer } )
  ],
  providers: [
  { provide: SETTINGS, useValue: {} },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    NGXLogger,
    RouteStateService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
