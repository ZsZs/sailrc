import { BaseEntityInterface } from '@sailrc/shared/base';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { MemoizedSelector, Selector } from '@ngrx/store';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  delete(): void;
  edit(entity: Partial<TModel>): void;
  save(): void;
  getFormState( formStateSelector: MemoizedSelector<any, any> ): Observable<FormGroupState<TModel>>
}

//export interface BaseEntityFormFacade<T extends BaseEntityInterface> extends IEntityFormFacade<T>{}

