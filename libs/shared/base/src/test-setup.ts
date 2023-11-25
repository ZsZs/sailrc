import 'jest-preset-angular/setup-jest';
import { Entity, IEntityInfo, Key } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from './lib/auto-entity/base-entity.interface';
import { mock } from 'jest-mock-extended';
import { IBaseEntityFacade } from './lib/auto-entity/base-entity.facade';
import { EMPTY } from 'rxjs';

@Entity({modelName: 'TestEntity', pluralName: 'testEntities', uriName: 'testEntity'})
export class TestEntity implements BaseEntityInterface {
  @Key id: string;
}

//@Injectable({ providedIn: 'root' }) class TestEntityFacade implements IBaseEntityFacade<TestEntity> {}

//@Injectable() export class TestEntityFeatureFacade extends BaseFormFacade<TestEntity> implements IEntityFormFacade<TestEntity> {}

export const mockBaseEntityFacade = mock<IBaseEntityFacade<TestEntity>>();
mockBaseEntityFacade.all$ = EMPTY;
mockBaseEntityFacade.isLoading$ = EMPTY;
export const mockEntityInfo = mock<IEntityInfo>();
mockEntityInfo.modelName = 'TestEntity';
