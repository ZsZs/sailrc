import { checkKeyName, ENTITY_OPTS_PROP, IEntityInfo, IEntityOptions } from '@briebug/ngrx-auto-entity';

export const getEntityInfo = ( type: any): IEntityInfo => {
  const instance = new type();
  const opts = (type[ENTITY_OPTS_PROP] || { modelName: instance.constructor.name }) as IEntityOptions;
  const modelName = opts.modelName;
  checkKeyName(type, modelName);
  return {
    modelType: type,
    ...opts
  };
};

