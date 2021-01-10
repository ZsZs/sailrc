
// prettier-ignore
import { IEntityFormState } from '@sailrc/shared/base';
import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { ISelectorMap } from './selector-map';

export const mapToEntityForm =
  <TState extends IEntityFormState<TModel>, TModel, TExtra>(state: TState & TExtra): TModel | null => !state || !state.entityForm ? null : state.entityForm.value;

// prettier-ignore
export const buildSelectorMap = <TParentState, TState extends IEntityFormState<TModel>, TModel, TExtra>(
  getState: Selector<TParentState, TState & TExtra> | MemoizedSelector<object | TParentState, TState & TExtra>
): ISelectorMap<TParentState, TModel> => {
  const selectEntityForm = createSelector(getState, mapToEntityForm);
  return {
    selectEntityForm
  } as ISelectorMap<TParentState, TModel>;
};
