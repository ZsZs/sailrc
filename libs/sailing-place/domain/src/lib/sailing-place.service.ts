import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SailingPlace } from './sailing-place';

@Injectable()
export class SailingPlaceService extends BaseFirestoreRepository<SailingPlace> {

  constructor( protected firestore: AngularFirestore ) {
    super( firestore );
  }
}
