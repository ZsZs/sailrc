import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Sailor } from '../domain/sailor';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';

@Injectable()
export class SailorService extends BaseFirestoreRepository<Sailor> {

  constructor( firestore: AngularFirestore ) {
    super( firestore );
  }
}
