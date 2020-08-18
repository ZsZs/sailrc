import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@sailrc/shared/base';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseFirestoreRepository<T extends BaseEntityInterface> implements IAutoEntityService<T> {
  protected collection: AngularFirestoreCollection<any>;

  constructor( protected path: string, protected firestore: AngularFirestore ) {
    this.collection = this.firestore.collection( path );
  }

  load(entityInfo: IEntityInfo, id: any ): Observable<T> {
    return this.collection.doc<any>(id).snapshotChanges().pipe(
      map(doc => {
        if ( doc.payload.exists ) {
          const data = doc.payload.data() as T;
          const docId = doc.payload.id;
          return { docId, ...data };
        }
      })
    );
  }

  loadAll( entityInfo: IEntityInfo ): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as T;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

  }

  create(entityInfo: IEntityInfo, entity: T ): Observable<T> {
    delete entity.id;
    const promise = new Promise<any>((resolve, reject ) => {
      this.collection.add( entity ).then( ref => {
        const newEntity = {
          id: ref.id,
          ...( entity as T)
        };
        resolve(newEntity);
      });
    });
    return from( promise );
  }

  update(entityInfo: IEntityInfo, entity: T ): Observable<T> {
    const promise = new Promise<any>((resolve, reject) => {
      const docRef = this.collection
        .doc<T>( String( entity.id ))
        .set( entity )
        .then(() => {
          resolve({
            ...( entity as T)
          });
        });
    });
    return from( promise );
  }

  delete(entityInfo: IEntityInfo, entity: T ): Observable<any> {
    const docRef = this.collection.doc<T>( String( entity.id ));
    return from( docRef.delete());
  }

  // protected, private helper methods
}
