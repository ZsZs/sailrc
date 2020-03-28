import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { SharedMaterialModule } from '@sailrc/shared/material';
import { Observable, of } from 'rxjs';
import { AuthFeatureFacade } from '@sailrc/shared/authentication/feature';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;
  const authFeatureFacadeStub = {
    isAuthenticated(): Observable<boolean> { return of( false ); },
    logout() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavListComponent ],
      imports: [SharedMaterialModule],
      providers:    [{ provide: AuthFeatureFacade, useValue: authFeatureFacadeStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
