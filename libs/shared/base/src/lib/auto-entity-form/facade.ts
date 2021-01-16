import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  edit(entity: Partial<TModel>): void;
  getFormState(): Observable<FormGroupState<TModel>>
}

