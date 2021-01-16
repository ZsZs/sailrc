import { IEntityFormState } from '@processpuzzle/shared/base';
import { IEntityFormFacade } from './facade';
import { ISelectorMap } from './selector-map';
import { EntityFormAction } from './actions';

type Constructor<TModel> = Function & { prototype: IEntityFormFacade<TModel> }

/**
 * Structure of the model state built by the buildState() function
 */
export interface IFormModelState<TParentState, TState, TModel, TExtra> {
  initialFormState: TState & TExtra,
  selectors: ISelectorMap<TParentState, TModel>;
  rawReducer: (state: TState & TExtra, action: EntityFormAction<TModel>) => IEntityFormState<TModel> & TExtra;
  formFacade: Constructor<TModel>
}

/**
 * The basic structure of a class for an entity
 */
export type IModelClass<TModel> = new () => TModel;
