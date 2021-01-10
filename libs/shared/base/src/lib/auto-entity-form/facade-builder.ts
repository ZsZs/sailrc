import { MemoizedSelector, Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';

import { IEntityFormFacade } from './facade';
import { ISelectorMap } from './selector-map';
import { EditEntity } from './actions';
import { Injectable } from '@angular/core';

/**
 * Builds a new facade class for the specified entity model and parent state.
 * @param selectors - the selector map for the specified entity
 */
export const buildFacade = <TModel, TParentState>(selectors: ISelectorMap<TParentState, TModel>) => {
/*
  const BaseFormFacade =
    class FormFacade implements IEntityFormFacade<TModel> {
      entityForm$: Observable<FormGroupState<TModel>>;
      modelType: new () => TModel;
      store: Store<any>;

      constructor(modelType: new () => TModel, store: Store<any>) {
        this.modelType = modelType;
        this.store = store;
      }

      delete(): void {
      }

      edit( entity: Partial<TModel> ): void {
        this.store.dispatch( new EditEntity( this.modelType, entity ) );
      }

      save(): void {
      }

    };
*/
  return BaseFormFacade;
};

@Injectable()
export class BaseFormFacade<TModel> implements IEntityFormFacade<TModel> {
  modelType: new () => TModel;
  store: Store<any>;

  // constructor(modelType: new () => TModel, store: Store<any>) {
  //   this.modelType = modelType;
  //   this.store = store;
  // }
  constructor(store: Store<any>) {
    this.store = store;
  }

  delete(): void {
  }

  edit( entity: Partial<TModel> ): void {
    this.store.dispatch( new EditEntity( this.modelType, entity ) );
  }

  save(): void {
  }

  getFormState( formStateSelector: MemoizedSelector<any, any> ): Observable<FormGroupState<TModel>>{
    return this.store.select( formStateSelector );
  }

};

