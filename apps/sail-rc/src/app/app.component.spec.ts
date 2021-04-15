import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from, Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@processpuzzle/authentication/feature';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsService } from '@processpuzzle/shared/widgets';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const initialState = { loggedIn: false };
  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> { return of( false ); },
    logout() { console.log("log out")}
  };
  const googleMapsServiceStub: Partial<GoogleMapsService> = {
    loadGoogleMapsAPI: (): Promise<boolean> => Promise.resolve(false )
  }
  let app: AppComponent;
  let googleMapsService: GoogleMapsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, SidenavListComponent],
      imports: [
        BreadcrumbModule,
        BrowserAnimationsModule,
        GoogleMapsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedMaterialModule,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthFeatureFacade, useValue: authFeatureFacadeStub },
        { provide: GoogleMapsService, useValue: googleMapsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach( () => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    googleMapsService = TestBed.inject( GoogleMapsService );

  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
