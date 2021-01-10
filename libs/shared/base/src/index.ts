export * from './lib/shared-base.module';
export { BaseEntityContainerComponent } from './lib/generic-components/base-entity-container.component'
export { BaseEntityInterface } from './lib/auto-entity/base-entity.interface';
export { BaseEntityFacade } from './lib/auto-entity/base-entity.facade';
export { BaseFirestoreRepository } from './lib/auto-entity/base-firestore-repository';
export { BaseFormComponent } from './lib/generic-components/base-form.component';
export { BaseListComponent } from './lib/generic-components/base-list.component';
export { BaseTabsComponent } from './lib/generic-components/base-tabs.component';
export { EntityService } from './lib/firestore/entity.service';
export { FirestoreBaseServiceInterface } from './lib/firestore/firestore-base.interface';
export { FirestoreBaseService } from './lib/firestore/firestore-base.service';
export { CreateEntity, DeleteEntity, EditEntity, EntityAPIError } from './lib/auto-entity-form/actions';
export { IEntityFormFacade } from './lib/auto-entity-form/facade';
export { IEntityFormState } from './lib/auto-entity-form/form-state';
export { buildAutoFormFeatureState } from './lib/auto-entity-form/state-builder';
