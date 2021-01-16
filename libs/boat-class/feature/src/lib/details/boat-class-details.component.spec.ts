import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatClassDetailsComponent } from './boat-class-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BoatClass, BoatClassFacade } from '@sailrc/boat/domain';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedMaterialModule } from '@processpuzzle/shared/material';

describe('BoatClassDetailsComponent', () => {
  let component: BoatClassDetailsComponent;
  let fixture: ComponentFixture<BoatClassDetailsComponent>;
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
      declarations: [ BoatClassDetailsComponent ],
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
    fixture = TestBed.createComponent(BoatClassDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
