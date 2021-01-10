import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';

/**
 * The definition of an Auto-Entity facade class
 */
export interface IEntityFormFacade<TModel> {
  delete(): void;
  edit(entity: Partial<TModel>): void;
  save(): void;
  getFormState(): Observable<FormGroupState<TModel>>
}

