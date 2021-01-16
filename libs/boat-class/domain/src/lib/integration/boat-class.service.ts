import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BoatClass } from '../domain/boat-class';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';

@Injectable()
export class BoatClassService extends BaseFirestoreRepository<BoatClass> {
  static readonly path = 'boat-classes';

  constructor( protected firestore: AngularFirestore ) {
    super( BoatClassService.path, firestore );
  }
}
