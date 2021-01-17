import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { EditEntity } from '@processpuzzle/shared/base';
import { getYachtClubById, YachtClub, YachtClubFacade } from '@sailrc/yacht-club/domain';
import { IYachtClubFeatureState } from './yacht-club.reducer';

@Injectable() export class YachtClubResolver implements Resolve<YachtClub> {

  constructor( private yachtClubFacade: YachtClubFacade, private store: Store<IYachtClubFeatureState> ) {}

  resolve( route: ActivatedRouteSnapshot ): Observable<YachtClub> {
    const idParam = 'yachtClubId';
    const yachtClubId = route.params[ idParam ];
    if ( yachtClubId === 'new' ) {
      const yachtClub: YachtClub = {
        id: undefined,
        name: ''
      };
      this.store.dispatch( new EditEntity<YachtClub>( YachtClub, yachtClub ));
      return from( [yachtClub]);
    } else {
      return this.store.pipe(
        select( getYachtClubById( yachtClubId ) ),
        tap( boat => {
          if ( !boat ) {
            this.yachtClubFacade.load({ id: yachtClubId } );
          }
        } ),
        filter( yachtClub => !!yachtClub ),
        first(),
        tap( yachtClub => {
          this.store.dispatch( new EditEntity( YachtClub, yachtClub ) )
        } )
      );
    }
  }
}
