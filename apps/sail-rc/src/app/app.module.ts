import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NGXLogger } from 'ngx-logger';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { SharedWidgetsModule, SnackBarService } from '@sailrc/shared/widgets';
import { CustomSerializer, SharedUtilModule } from '@sailrc/shared/util';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { appReducers, AppState, metaReducers } from './app.reducer';
import { NgrxFormsModule } from 'ngrx-forms';
import { RouteStateService } from '../../../../libs/shared/util/src/lib/router/route-state.service';

export const APP_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('root reducer');

@NgModule({
  declarations: [AppComponent],
  imports: [
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
