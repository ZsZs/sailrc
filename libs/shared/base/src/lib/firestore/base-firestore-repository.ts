import { IAutoEntityService, IEntityInfo, makeEntity } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '../auto-entity/base-entity.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseFirestoreRepository<T extends BaseEntityInterface> implements IAutoEntityService<T> {
  protected collection: AngularFirestoreCollection<T>;

  protected constructor(protected firestore: AngularFirestore) {}

  load(entityInfo: IEntityInfo, keys: any, criteria?: any): Observable<T> {
    this.determineCollection(entityInfo, criteria);

    const document = this.collection.doc<T>(keys.id);
    return document.snapshotChanges().pipe(
      map((doc) => {
        if (doc.payload.exists) {
          const data = doc.payload.data() as T;
          const docId = doc.payload.id;
          return makeEntity( entityInfo.modelType )( { id: docId, ...data } );
        } else return undefined;
      })
    );
  }

  loadAll(entityInfo: IEntityInfo, criteria?: any): Observable<T[]> {
    this.determineCollection(entityInfo, criteria);

    return this.collection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as T;
          const docId = a.payload.doc.id;
          return makeEntity( entityInfo.modelType )( { id: docId, ...data } );
        });
      })
    );
  }

  create(entityInfo: IEntityInfo, entity: T, criteria?: any): Observable<T> {
    this.determineCollection(entityInfo, criteria);
    delete entity.id;
    const promise = new Promise<T>((resolve) => {
      this.collection.add(entity).then((ref) => {
        const newEntity = {
          id: ref.id,
          ...(entity as T),
        };
        resolve(newEntity);
      });
    });
    return from(promise);
  }

  update(entityInfo: IEntityInfo, entity: T, criteria?: any): Observable<T> {
    this.determineCollection(entityInfo, criteria);
    const promise = new Promise<T>((resolve) => {
      this.collection
        .doc<T>(String(entity.id))
        .set(entity)
        .then(() => {
          resolve({
            ...(entity as T),
          });
        });
    });
    return from(promise);
  }

  delete(entityInfo: IEntityInfo, entity: T, criteria?: any): Observable<T> {
    this.determineCollection(entityInfo, criteria);
    const docRef = this.collection.doc<T>(String(entity.id));
    return from(
      docRef
        .delete()
        .then(() => {
          return entity;
        })
        .catch((error) => {
          console.log(error);
          return entity;
        })
    );
  }

  // protected, private helper methods
  protected determineCollection(entityInfo: IEntityInfo, criteria?: any) {
    const path = entityInfo.uriName ? entityInfo.uriName : entityInfo.modelName;
    this.collection = this.firestore.collection( path );
  }
}
