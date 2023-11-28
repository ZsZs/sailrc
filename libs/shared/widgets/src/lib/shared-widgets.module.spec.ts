import { async, TestBed } from '@angular/core/testing';
import { SharedWidgetsModule } from './shared-widgets.module';
import { MockModule } from 'ng-mocks';
import { SharedBaseModule } from '@processpuzzle/shared/base';
import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MockUiState {}
interface IBaseEntityFacade<T> {}

describe('SharedWidgetsModule', () => {
  beforeEach(async(() => {
    const mockUiReducer = jest.fn();
    const UI_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<MockUiState>>('ui reducer');

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedWidgetsModule,
        MockModule(SharedBaseModule),
      ],
      providers: [{ provide: UI_REDUCER_TOKEN, useValue: mockUiReducer }]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedWidgetsModule).toBeDefined();
  });
});
