import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { Participant } from '@sailrc/race/domain';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEntityInfo } from '@briebug/ngrx-auto-entity';

@Injectable()
export class ParticipantService extends BaseFirestoreRepository<Participant> {
  constructor(firestore: AngularFirestore) {
    super(firestore);
  }

  // protected, private helper methods
  protected determineCollection(entityInfo: IEntityInfo, criteria?: any) {
    const path = entityInfo.uriName.replace(':RaceId', criteria.raceId).replace(':LapId', criteria.lapId);
    this.collection = this.firestore.collection(path);
  }
}
