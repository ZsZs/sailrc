import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, of, Subscription } from 'rxjs';
import { Lap, LapFacade, Race, RaceFacade } from '@sailrc/race/domain';
import { RouteStateService } from '@processpuzzle/shared/util';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'sailrc-race-lap-container',
  templateUrl: './race-lap-container.component.html',
  styleUrls: ['./race-lap-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceLapContainerComponent implements OnDestroy, OnInit {
  @ViewChild('raceSelect') raceSelector: MatSidenav;
  selectedLap$: Observable<Lap>;
  selectedRace$: Observable<Race>;
  lastUrlSegment$: Observable<string>;
  private lastUrlSegmentSubscription: Subscription;

  constructor(private raceFacade: RaceFacade, private lapFacade: LapFacade, private routeState: RouteStateService) {}

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

  // region component event hooks
  closeRaceSelector() {
    this.raceSelector.close();
  }
  // endregion

  // protected, private helper methods
  private subscribeToLastUrlSegment() {
    this.lastUrlSegmentSubscription = this.routeState.urlSegment
      .pipe(
        filter((urlSegment) => {
          return !!urlSegment;
        })
      )
      .subscribe((urlSegment) => {
        return (this.lastUrlSegment$ = of(urlSegment));
      });
  }
  // endregion
}
