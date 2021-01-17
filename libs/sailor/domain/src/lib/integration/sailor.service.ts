import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sailor } from '../domain/sailor';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';

@Injectable()
export class SailorService extends BaseFirestoreRepository<Sailor> {
  static readonly path = 'sailors';

  constructor( firestore: AngularFirestore ) {
    super( SailorService.path, firestore );
  }
}
