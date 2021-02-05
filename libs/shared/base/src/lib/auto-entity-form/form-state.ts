import { FormGroupState } from 'ngrx-forms';

/**
 * Structure for how forms are stored, including useful computed properties
 * such as an array of their keys, status flags, timestamps, etc.
 */
export interface IEntityFormState<TModel> {
  entityForm: FormGroupState<TModel>;
  returnTo: string;
}

export type FormValidatorFunction<TModel> = (t: FormGroupState<TModel>) => FormGroupState<TModel>;
