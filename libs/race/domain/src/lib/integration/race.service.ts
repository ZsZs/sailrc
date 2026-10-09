import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { Race } from '../domain/race';

@Injectable()
export class RaceService extends BaseFirestoreRepository<Race> {

  constructor( firestore: AngularFirestore ) {
    super( firestore );
  }
}
