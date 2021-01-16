import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassListComponent } from './boat-class-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFeatureFacade } from '@processpuzzle/shared/authentication/feature';
import { Observable, of } from 'rxjs';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';

describe('BoatClassListComponent', () => {
  let component: BoatClassListComponent;
  let fixture: ComponentFixture<BoatClassListComponent>;
  let store: MockStore;
  const initialState = {};
  const boatClassFacadeStub = {
    all$: of([]),
    isLoading$: of( false ),
    delete( boat: BoatClass ) {},
    loadAll() {},
    selectMany( boats: BoatClass[] ) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoatClassListComponent ],
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, RouterTestingModule, SharedMaterialModule],
      providers: [
        provideMockStore({ initialState }),
        { provide: BoatClassFacade, useValue: boatClassFacadeStub }
      ]
    })
    .compileComponents();

    store = TestBed.inject( MockStore );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
