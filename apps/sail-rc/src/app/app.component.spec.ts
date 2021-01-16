import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@processpuzzle/authentication/feature';

describe('AppComponent', () => {
  let store: MockStore;
  const initialState = { loggedIn: false };
  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> { return of( false ); },
    logout() { console.log("log out")}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, SidenavListComponent],
      imports: [BrowserAnimationsModule, HttpClientModule, RouterTestingModule, SharedMaterialModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthFeatureFacade, useValue: authFeatureFacadeStub }
      ]
    }).compileComponents();

    store = TestBed.inject( MockStore );
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
