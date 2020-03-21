import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseFirestoreRepository, FirestoreBaseService } from '@sailrc/shared/base';
import { BoatClass } from '../domain/boat-class';

@Injectable()
export class BoatClassService extends BaseFirestoreRepository<BoatClass> {
  static readonly path = 'boat-classes';

  constructor( firestore: AngularFirestore ) {
    super( BoatClassService.path, firestore );
  }
}
