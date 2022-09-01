import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { Lap } from '../domain/lap';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable()
export class LapService extends BaseFirestoreRepository<Lap> {
  constructor(firestore: AngularFirestore) {
    super(firestore);
  }

  // protected, private helper methods
  protected determineCollection(entityInfo: IEntityInfo, criteria?: any) {
    const path = entityInfo.uriName.replace(':RaceId', criteria);
    this.collection = this.firestore.collection(path);
  }
}
