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
    isAuthenticated(): Observable<boolean> { return of( false ); },
    logout() { console.log( "logout" )}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [BreadcrumbModule, RouterTestingModule, SharedMaterialModule],
      providers:    [{ provide: AuthFeatureFacade, useValue: authFeatureFacadeStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
