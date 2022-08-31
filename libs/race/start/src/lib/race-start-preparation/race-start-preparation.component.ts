import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import deepEqual from 'deep-equal';

import { Lap, LapFacade, LapState, StartSignals } from '@sailrc/race/domain';
import { ActiveTabService } from '@processpuzzle/shared/base';
import { RouteStateService } from '@processpuzzle/shared/util';
import { RaceTimerComponent } from '@sailrc/race/shared';
import { RaceStartSignsComponent } from '../race-start-signs/race-start-signs.component';
import { StartTimePickerComponent } from '../race-start-time-selector/start-time-picker.component';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'sailrc-race-start-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './race-start-preparation.component.html',
  styleUrls: ['./race-start-preparation.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceStartPreparationComponent implements AfterViewInit, OnDestroy, OnInit {
  // region attributes
  private currentLap: Lap;
  lapFinishTime: Date = null;
  lapStartTime: Date = null;
  lapState: LapState;
  @ViewChild('raceStartSigns', { static: false }) private raceStartSigns: RaceStartSignsComponent;
  @ViewChild('raceTimeCounter', { static: false }) private raceTimerComponent: RaceTimerComponent;
  @ViewChild('startTimePicker', {static: false}) private startTimePicker: StartTimePickerComponent;
  private lastRouteSegment: Observable<string>;
  private readonly onDestroy$ = new Subject<void>();
  private readonly tabName: string;
  // endregion

  // region constructors
  constructor(
      private lapFacade: LapFacade,
      private activeTabService: ActiveTabService,
      private route: ActivatedRoute,
      private routeState: RouteStateService,
      private logger: NGXLogger
  ) {
    this.tabName = 'start-countdown';
    this.lastRouteSegment = this.routeState.subscribeToRouteSegments(RaceStartPreparationComponent.name, this.route);
  }
  // endregion

  // region angular lifecycle hooks
  ngAfterViewInit(): void {
    this.subscribeToCurrentLapChanges();
  }

  ngOnDestroy(): void {
    this.activeTabService.tabIsInActive(this.tabName);
    this.onDestroy$.next();
    this.routeState.unsubscribeFromRouteSegments(RaceStartPreparationComponent.name);
  }

  ngOnInit(): void {
    this.activeTabService.tabIsActive(this.tabName);
  }
  // endregion

  // region event handling methods
  onAbortCountdown() {
    if (confirm('Are you sure to stop counting down? ')) {
      this.lapStartTime = null;
      this.lapState = LapState.Planned;
      this.updateLapFromComponent();
    }
  }

  onCancelRace() {
    if (confirm('Are you sure to cancel race? ')) {
      this.lapState = LapState.Cancelled;
      this.lapFinishTime = new Date();
      this.updateLapFromComponent();
    }
  }

  onFinishRace() {
    if (confirm('Are you sure to finish race? ')) {
      this.lapState = LapState.Finished;
      this.lapFinishTime = new Date();
      this.updateLapFromComponent();
    }
  }

  onRecall() {
    if (confirm('Are you sure to stop the race? ')) {
      this.lapFinishTime = null;
      this.lapStartTime = null;
      this.lapState = LapState.Planned;
      this.updateLapFromComponent();
    }
  }

  onStartSignalEvent( $event: StartSignals ) {
    switch( $event ) {
      case StartSignals.StartSignal:
        this.lapState = LapState.Started;
        this.updateLapFromComponent();
        break;
      case StartSignals.RecallSignal:
        this.lapState = LapState.Running;
        this.updateLapFromComponent();
        break;
    }
  }

  onStartTimeEvent( $event: Date ) {
    this.lapStartTime = $event;
    this.lapFinishTime = null;
    this.lapState = LapState.Countdown;
    this.updateLapFromComponent();
  }
  // endregion

  // region protected, private methods
  private subscribeToCurrentLapChanges() {
    this.lapFacade.current$
      .pipe(
        takeUntil(this.onDestroy$),
        map((lap) => {
          if( !deepEqual( this.currentLap, lap )) {
            this.currentLap = lap;
            this.updateComponentFromLap(lap);
          }
        })
      ).subscribe();
  }

  private updateComponentFromLap(lap: Lap) {
    this.logger.debug( `Update race-start-preparation.component from lap: ${JSON.stringify( lap )}` );

    const now = new Date();
    if( lap.startTime < now && lap.state < LapState.Started ) {
      this.lapStartTime = null;
      this.lapFinishTime = null;
      this.lapState = LapState.Planned;
      this.updateLapFromComponent();
    } else {
      this.lapFinishTime = lap.finishTime;
      this.lapStartTime = lap.startTime;
      this.lapState = lap.state;
    }
  }

  private updateLapFromComponent() {
      const updatedLap = Object.assign( {}, this.currentLap );
      updatedLap.finishTime = this.lapFinishTime;
      updatedLap.startTime = this.lapStartTime;
      updatedLap.state = this.lapState;
      this.lapFacade.update( updatedLap, updatedLap.raceId);
  }
  // endregion
}
