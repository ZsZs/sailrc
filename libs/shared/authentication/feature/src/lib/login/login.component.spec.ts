import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFeatureFacade } from '@processpuzzle/shared/authentication/feature';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialState = { loggedIn: false };
  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> { return of( false ); },
    logout() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, RouterTestingModule, SharedMaterialModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthFeatureFacade, useValue: authFeatureFacadeStub }
      ]
    })
    .compileComponents();

    store = TestBed.inject( MockStore );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
