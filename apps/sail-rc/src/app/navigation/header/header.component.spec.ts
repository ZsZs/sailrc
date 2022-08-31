import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@processpuzzle/authentication/feature';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> {
      return of(false);
    },
    logout() {
      console.log('Stub logout() has been called.');
    },
  };
  const isAuthenticated = jest.spyOn( authFeatureFacadeStub, 'isAuthenticated' );
  const logout = jest.spyOn( authFeatureFacadeStub, 'logout' );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [BreadcrumbModule, RouterTestingModule, SharedMaterialModule],
      providers: [{ provide: AuthFeatureFacade, useValue: authFeatureFacadeStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() check authentication status', () => {
    expect( isAuthenticated ).toBeCalled();

    component.isAuth.subscribe( isAuthenticated => {
      expect( isAuthenticated ).toBeFalsy();
    });
  });

  it( 'onLogout() delegates call to AuthFeatureFacade', () => {
    component.onLogout();
    expect( logout ).toBeCalled();
  })

  it('onToggleSidenav() emits event', () => {
    const sidenavToggle = spyOn(component.sidenavToggle, 'emit' )
    component.onToggleSidenav();
    expect( sidenavToggle ).toHaveBeenCalled();
  });
});
