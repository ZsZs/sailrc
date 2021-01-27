import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { BaseEntityInterface } from '@processpuzzle/shared/base';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class BaseFirestoreRepository<T extends BaseEntityInterface> implements IAutoEntityService<T> {
  protected collection: AngularFirestoreCollection<any>;

  protected constructor( protected firestore: AngularFirestore ) {}

  load(entityInfo: IEntityInfo, keys: any, criteria?: any ): Observable<T> {
    this.determineCollection( entityInfo, criteria );

    const document = this.collection.doc<any>(keys.id);
    return document.snapshotChanges().pipe(
      map(doc => {
        if ( doc.payload.exists ) {
          const data = doc.payload.data() as T;
          const docId = doc.payload.id;
          return { id: docId, ...data };
        }
      })
    );
  }

  loadAll( entityInfo: IEntityInfo, criteria?: any ): Observable<T[]> {
    this.determineCollection( entityInfo, criteria );
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

  create(entityInfo: IEntityInfo, entity: T, criteria?: any ): Observable<T> {
    this.determineCollection( entityInfo, criteria );
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

  update(entityInfo: IEntityInfo, entity: T, criteria?: any ): Observable<T> {
    this.determineCollection( entityInfo, criteria );
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

  delete(entityInfo: IEntityInfo, entity: T, criteria?: any ): Observable<any> {
    this.determineCollection( entityInfo, criteria );
    const docRef = this.collection.doc<T>( String( entity.id ));
    return from( docRef.delete());
  }

  // protected, private helper methods
  protected determineCollection( entityInfo: IEntityInfo, criteria?: any ) {
    this.collection = this.firestore.collection( entityInfo.uriName );
  }
}
