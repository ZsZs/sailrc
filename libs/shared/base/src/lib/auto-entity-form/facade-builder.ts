import { ISelectorMap } from './selector-map';
import { BaseFormFacade } from './base-form-facade';

export let selectorsVariable: ISelectorMap<any, any>;

/**
 * Builds a new facade class for the specified entity model and parent state.
 * @param selectors - the selector map for the specified entity
 */
export const buildFacade = <TModel, TParentState>(selectors: ISelectorMap<TParentState, TModel>) => {
  selectorsVariable = selectors;
  return BaseFormFacade;
};
