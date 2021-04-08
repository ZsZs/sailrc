import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Lap, LapFacade, Race, RaceFacade } from '@sailrc/race/domain';
import { filter } from 'rxjs/operators';
import { RouteStateService } from '@processpuzzle/shared/util';

@Component({
  selector: 'sailrc-race-participant',
  templateUrl: './race-participant.component.html',
  styleUrls: ['./race-participant.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceParticipantComponent implements OnDestroy, OnInit {
  selectedLap$: Observable<Lap>;
  selectedRace$: Observable<Race>;
  lastUrlSegment$: Observable<string>;
  private lastUrlSegmentSubscription: Subscription;

  constructor( private raceFacade: RaceFacade, private lapFacade: LapFacade, private routeState: RouteStateService ) {
  }

  // region angular lifecycle hooks
  ngOnDestroy() {
    this.lastUrlSegmentSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.selectedRace$ = this.raceFacade.current$;
    this.selectedLap$ = this.lapFacade.current$;
    this.subscribeToLastUrlSegment();
  }
  // endregion

  // protected, private helper methods
  private subscribeToLastUrlSegment() {
    this.lastUrlSegmentSubscription = this.routeState.urlSegment.pipe(
      filter( urlSegment => {
        return !!urlSegment;
      } )
    ).subscribe(
      urlSegment => {
        return this.lastUrlSegment$ = of( urlSegment );
      }
    );
  }
  // endregion
}
