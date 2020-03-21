import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxFormsModule } from 'ngrx-forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { SharedWidgetsModule, SnackBarService } from '@sailrc/shared/widgets';
import { RouteStateService, SharedUtilModule } from '@sailrc/shared/util';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { appReducers, AppState, metaReducers } from './app.reducer';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

export const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

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
    AppMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.logger.serverLoggingUrl + '/api/logs',
      level: environment.logger.level,
      serverLogLevel: environment.logger.serverLogLevel,
      disableConsoleLogging: environment.logger.disableConsoleLogging
    }),
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgrxFormsModule,
    SharedUtilModule,
    SharedWidgetsModule,
    StoreModule.forRoot( APP_REDUCER_TOKEN, { metaReducers } ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
//    StoreRouterConnectingModule.forRoot( { stateKey: 'router', serializer: CustomSerializer } )
  ],
  providers: [
  { provide: APP_REDUCER_TOKEN, useValue: appReducers },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    NGXLogger,
    RouteStateService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
