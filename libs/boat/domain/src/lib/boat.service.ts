import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { AngularFirestore } from '@angular/fire/firestore';
import { Boat } from '@sailrc/boat/domain';

@Injectable()
export class BoatService extends BaseFirestoreRepository<Boat> {

  constructor( protected firestore: AngularFirestore ) {
    super( firestore );
  }
}
