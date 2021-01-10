import { createFormGroupState, disable, formGroupReducer, FormGroupState, setValue, StateUpdateFns, updateGroup } from 'ngrx-forms';
import { Action, ActionReducer, Store } from '@ngrx/store';
import { camelCase } from './case';
import { EditEntity, EntityFormAction, EntityFormActionTypes } from './actions';
import { Observable } from 'rxjs';
import { Edit } from '@briebug/ngrx-auto-entity';

/**
 * Structure for how forms are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityFormState<TModel> {
  entityForm: FormGroupState<TModel>;
}

export type FormValidatorFunction<TModel> = (t: FormGroupState<TModel>) => FormGroupState<TModel>;
