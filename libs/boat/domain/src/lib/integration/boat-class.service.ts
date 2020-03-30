import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BoatClass } from '../domain/boat-class';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BoatClassService  implements IAutoEntityService<BoatClass> {
  static readonly path = 'boat-classes';
  protected collection: AngularFirestoreCollection<BoatClass>;

  constructor( private firestore: AngularFirestore ) {
    this.collection = this.firestore.collection( BoatClassService.path );
  }


  load(entityInfo: IEntityInfo, id: any, raceId: string ): Observable<BoatClass> {
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

  loadAll( entityInfo: IEntityInfo, raceId: string ): Observable<BoatClass[]> {
    return this.collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any;
          return data;
        });
      })
    );
  }

  create( entityInfo: IEntityInfo, entity: BoatClass ): Observable<BoatClass> {
    const promise = new Promise<BoatClass>((resolve, reject ) => {
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

  update(entityInfo: IEntityInfo, entity: BoatClass ): Observable<BoatClass> {
    const promise = new Promise<BoatClass>((resolve, reject) => {
      const docRef = this.collection
        .doc<BoatClass>( entity.id )
        .set( entity )
        .then(() => {
          resolve({
            ...(entity as any)
          });
        });
    });
    return from( promise );
  }

  delete( entityInfo: IEntityInfo, entity: BoatClass ): Observable<any> {
    const docRef = this.collection.doc<BoatClass>( entity.id );
    return from( docRef.delete());
  }
}
