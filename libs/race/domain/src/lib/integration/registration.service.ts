import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { Registration } from '@sailrc/race/domain';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable()
export class RegistrationService extends BaseFirestoreRepository<Registration> {

  constructor( firestore: AngularFirestore ) {
    super( firestore );
  }

  // protected, private helper methods
  protected determineCollection( entityInfo: IEntityInfo, criteria?: any ) {
    const path = entityInfo.uriName.replace( ':RaceId', criteria );
    this.collection = this.firestore.collection( path );
  }
}
