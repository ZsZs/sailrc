import { TestBed } from '@angular/core/testing';
import { BaseFormFacade } from './base-form-facade';
import { TestEntity } from '../../test-setup';
import { IEntityFormFacade } from '@processpuzzle/shared/base';
import { BrowserModule } from '@angular/platform-browser';
import { buildState, IAutoEntityService, IEntityState, NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { mock } from 'jest-mock-extended';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Injectable } from '@angular/core';

describe('BaseFormFacade', () => {
  const { initialState, facade: TestEntityFacadeBase } = buildState(TestEntity);
  const testEntityService = mock<IAutoEntityService<TestEntity>>();
  function testEntityReducer(state = initialState): IEntityState<TestEntity> {return state;}
  interface IAppState { testEntity: IEntityState<TestEntity> }
  type AppState = IAppState;
  const appReducer: ActionReducerMap<AppState> = { testEntity: testEntityReducer };

  @Injectable({providedIn: 'root'}) class TestEntityFacade extends TestEntityFacadeBase {
    constructor(private store: Store<AppState>) {
      super(TestEntity, store);
    }
  }

  class TestEntityFeatureFacade extends BaseFormFacade<TestEntity> implements IEntityFormFacade<TestEntity>{
    constructor(protected store: Store<any>, protected router: Router, protected testEntityFacade: TestEntityFacade ) {
      super( TestEntity, store, router, testEntityFacade );
    }
  }

  let testEntityFeatureFacade: TestEntityFeatureFacade;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        EffectsModule.forRoot([]),
        NgrxAutoEntityModule.forRoot(),
        RouterTestingModule,
        StoreModule.forRoot( testEntityReducer ),
      ],
      providers: [
        { provide: TestEntity, useClass: testEntityService },
        TestEntityFacade
      ]
    }).compileComponents();
  })

  beforeEach( () => {
    testEntityFeatureFacade = TestBed.inject(TestEntityFeatureFacade);
  })

  it( 'facade is created', () => {
    expect( testEntityFeatureFacade ).toBeTruthy();
  })
})
