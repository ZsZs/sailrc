import { BaseEntityInterface } from '@sailrc/shared/base';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export abstract class FirestoreAutoEntityService<T extends BaseEntityInterface> implements IAutoEntityService<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor( path: string, protected firestore: AngularFirestore ) {
    this.collection = this.firestore.collection( path );
  }

  load(entityInfo: IEntityInfo, id: any, raceId: string ): Observable<T> {
    return this.collection.doc<any>(id).snapshotChanges().pipe(
      map( doc => {
        if ( doc.payload.exists ) {
          /* workaround until spread works with generic types */
          const data = doc.payload.data() as any;
          const docId = doc.payload.id;
          return { docId, ...data };
        }
      })
    );
  }

  loadAll( entityInfo: IEntityInfo, raceId: string ): Observable<T[]> {
    return this.collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any;
          return data;
        });
      })
    );
  }

  create( entityInfo: IEntityInfo, entity: T ): Observable<T> {
    const promise = new Promise<T>((resolve, reject ) => {
      this.collection.add( entity ).then( ref => {
        const newItem = {
          id: ref.id,
          /* workaround until spread works with generic types */
          ...( entity as any)
        };
        resolve( newItem );
      });
    });
    return from( promise );
  }

  update(entityInfo: IEntityInfo, entity: T ): Observable<T> {
    const promise = new Promise<T>((resolve, reject) => {
      const docRef = this.collection
        .doc<T>( entity.id )
        .set( entity )
        .then(() => {
          resolve({
            ...(entity as any)
          });
        });
    });
    return from( promise );
  }

  delete( entityInfo: IEntityInfo, entity: T ): Observable<any> {
    const docRef = this.collection.doc<T>( entity.id );
    return from( docRef.delete());
  }

}
