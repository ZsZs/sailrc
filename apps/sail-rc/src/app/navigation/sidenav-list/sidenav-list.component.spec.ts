import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@processpuzzle/authentication/feature';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;
  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> {
      return of(false);
    },
    logout() {
      console.log('log out');
    },
  };
  const isAuthenticated = jest.spyOn(authFeatureFacadeStub, 'isAuthenticated');
  const logout = jest.spyOn(authFeatureFacadeStub, 'logout');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavListComponent],
      imports: [SharedMaterialModule],
      providers: [{ provide: AuthFeatureFacade, useValue: authFeatureFacadeStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit() check authentication status', () => {
    expect(isAuthenticated).toBeCalled();

    component.isAuth.subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBeFalsy();
    });
  });

  it('onLogout() delegates call to AuthFeatureFacade', () => {
    component.onLogout();
    expect(logout).toBeCalled();
  });

  it('onLogout() calls onCloseSidenav()', () => {
    const onCloseSideNav = jest.spyOn(component, 'onCloseSidenav');
    component.onLogout();
    expect(onCloseSideNav).toBeCalled();
  });

  it('onCloseSidenav() emits event', () => {
    const closeSidenav = jest.spyOn(component.closeSidenav, 'emit');
    component.onCloseSidenav();
    expect(closeSidenav).toHaveBeenCalled();
  });
});
