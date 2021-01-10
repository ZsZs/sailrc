import { Action, createAction, props } from '@ngrx/store';
import { pascalCase } from './case';

export enum EntityFormActionTypes {
  CreateEntity = '[Entity] (Generic feature) Create new entity',
  DeleteEntity = '[Entity] (Generic feature) Delete entity',
  EditEntity = '[Entity] (Generic feature) Edit entity',
  EntityAPIError = '[Entity] (Generic feature) entity API error',
}

export type TNew<TModel> = new () => TModel;

/**
 * Entity class
 */
export interface IEntityInfo {
  modelName: string;
  pluralName?: string;
  uriName?: string;
  modelType: new () => any;
}

export interface IEntityFormAction extends Action {
  actionType: string;
  info: IEntityInfo;
}

/**
 * Structure for all of this library's actions
 */
export abstract class EntityFormAction<TModel> implements IEntityFormAction {
  type: string;
  info: IEntityInfo;

  protected constructor(type: TNew<TModel>, public actionType: string ) {
    this.info = setInfo(type);
    this.type = setType(this.actionType, this.info);
  }
}

const setInfo = (type: any): IEntityInfo => {
  const instance = new type();
  const modelName = instance.constructor.name;
  return {
    modelType: type,
    modelName
  };
};

const setType = (actionType: string, info: IEntityInfo): string => {
  const name = info.modelName;
  const entity = pascalCase(name);

  return actionType.replace('Entity', entity);
};

export class CreateEntity<TModel> extends EntityFormAction<TModel> {
  constructor( type: new () => TModel ) {
    super( type, EntityFormActionTypes.CreateEntity );
  }
}

export class DeleteEntity<TModel> extends EntityFormAction<TModel> {
  constructor( type: new () => TModel ) {
    super( type, EntityFormActionTypes.DeleteEntity );
  }
}

export class EditEntity<TModel> extends EntityFormAction<TModel> {
  public entity: TModel;

  constructor( type: new () => TModel, entity: TModel ) {
    super( type, EntityFormActionTypes.EditEntity );
    this.entity = entity;
  }
}

export class EntityAPIError<TModel> extends EntityFormAction<TModel> {
  constructor( type: new () => TModel ) {
    super( type, EntityFormActionTypes.EntityAPIError );
  }
}

/**
 * Union of all known entity action types
 */
export type EntityFormActions<TModel> =
  | EditEntity<TModel>
  | CreateEntity<TModel>
  | EntityAPIError<TModel>;
