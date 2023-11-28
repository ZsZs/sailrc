import { Injectable } from '@angular/core';
import { BaseFirestoreRepository } from '@processpuzzle/shared/base';
import { YachtClub } from './yacht-club';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({providedIn: 'root'})
export class YachtClubService extends BaseFirestoreRepository<YachtClub> {

  constructor( protected firestore: AngularFirestore ) {
    super( firestore );
  }
}
