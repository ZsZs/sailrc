import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';
import { RaceFieldMark } from '../domain/race-field-mark';

@Injectable() export class RaceFieldMarkService extends BaseFirestoreRepository<RaceFieldMark> {

  constructor( firestore: AngularFirestore  ) {
    super( firestore );
  }

  // protected, private helper methods
  protected determineCollection( entityInfo: IEntityInfo, criteria?: any ) {
    const path = entityInfo.uriName.replace( ':RaceId', criteria.raceId ).replace( ':LapId', criteria.lapId );
    this.collection = this.firestore.collection( path );
  }
}
