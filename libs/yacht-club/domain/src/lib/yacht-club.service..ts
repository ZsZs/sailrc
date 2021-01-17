import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { YachtClub } from './yacht-club';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class YachtClubService extends BaseFirestoreRepository<YachtClub> {
  static readonly path = 'yacht-clubs';

  constructor( protected firestore: AngularFirestore ) {
    super( YachtClubService.path, firestore );
  }
}
