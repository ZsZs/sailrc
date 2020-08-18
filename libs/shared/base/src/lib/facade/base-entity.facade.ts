import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { IEntityFacade } from '@briebug/ngrx-auto-entity';

export interface BaseEntityFacade<T extends BaseEntityInterface> extends IEntityFacade<T>{
  entityName: string;
  entityIdPathVariable: string;
}
