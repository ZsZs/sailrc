
// prettier-ignore
import { IEntityFormState } from '@processpuzzle/shared/base';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { ISelectorMap } from './selector-map';
import { FormGroupState } from 'ngrx-forms';

export const mapToEntityForm =
  <TState extends IEntityFormState<TModel>, TModel, TExtra>(state: TState & TExtra): FormGroupState<TModel> | null => {
  return !state || !state.entityForm ? null : state.entityForm;
}

// prettier-ignore
export const mapToReturnTo =
  <TState extends IEntityFormState<TModel>, TModel, TExtra>(state: TState & TExtra): string =>
    (!state ? '' : state.returnTo);


// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityFormState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>
): ISelectorMap<TParentState, TModel> => {
  const selectEntityForm = createSelector(getState, mapToEntityForm);
  const selectReturnTo = createSelector(getState, mapToReturnTo);
  return {
    selectEntityForm,
    selectReturnTo
  } as ISelectorMap<TParentState, TModel>;
};
