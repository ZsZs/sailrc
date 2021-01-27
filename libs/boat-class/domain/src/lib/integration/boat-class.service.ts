import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoatClass } from '../domain/boat-class';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';

@Injectable()
export class BoatClassService extends BaseFirestoreRepository<BoatClass> {

  constructor( protected firestore: AngularFirestore ) {
    super( firestore );
  }
}
