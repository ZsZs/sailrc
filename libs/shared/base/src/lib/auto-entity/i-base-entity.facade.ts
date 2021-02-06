import { BaseEntityInterface } from './base-entity.interface';
import { IEntityFacade, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { MemoizedSelector } from '@ngrx/store';

export interface IBaseEntityFacade<T extends BaseEntityInterface> extends IEntityFacade<T>{
  readonly entityInfo: IEntityInfo;
  readonly entityIdPathVariable: string;
  getEntityById( id: string ): MemoizedSelector<object | T, T>
}
