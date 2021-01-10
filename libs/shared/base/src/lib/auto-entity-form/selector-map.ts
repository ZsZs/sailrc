import { MemoizedSelector } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';

/**
 * Structure of a Selector Map defining all the selectors that may
 * be used to retrieve state managed by Auto-Entity
 */
export interface ISelectorMap<TParentState, TModel> {
  selectForm: MemoizedSelector<object | TParentState, FormGroupState<TModel> | null>;
  selectEntityForm: MemoizedSelector<object | TParentState, TModel | null>;
}
