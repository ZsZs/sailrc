import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';

import { Lap, LapFacade } from '@sailrc/race/domain';

@Injectable() export class LapResolver implements Resolve<Lap>{
  private readonly parameterName: string;

  constructor( private lapFacade: LapFacade ) {
    this.parameterName = this.lapFacade.entityIdPathVariable;
  }

  private static resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }

  resolve( route: ActivatedRouteSnapshot ): Observable<Lap> | Promise<Lap> | Lap {
    this.loadAllLaps( route );
    const lapIndex = LapResolver.resolveParameter( route, this.parameterName );
    let entity$: Observable<Lap>;
    if ( lapIndex === 'unknown' ) {
      entity$ = this.resolveUnknownEntity();
    } else {
      entity$ = this.resolveEntity( lapIndex );
    }
    return entity$;
  }

// region protected, private helper methods
  private loadAllLaps( route: ActivatedRouteSnapshot ) {
    const raceId = LapResolver.resolveParameter( route, 'RaceId' );
    this.lapFacade.loadAll( raceId );
  }

  private resolveEntity( lapIndex: number ): Observable<Lap> {
    return this.lapFacade.all$.pipe(
      map( laps => laps.filter( lap => lap.index == lapIndex )),
      filter( laps => !!laps && laps.length > 0 ),
      first(),
      map( laps => laps[0]),
      tap( lap => this.lapFacade.select( lap ))
    );
  }

  private resolveUnknownEntity(): Observable<Lap> {
    return this.resolveEntity( 1 );
  }
  // endregion
}
