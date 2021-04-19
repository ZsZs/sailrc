import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, timer } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Lap, LapFacade, LapState } from '@sailrc/race/domain';
import { ActiveTabService } from '@processpuzzle/shared/widgets';
import { RouteStateService } from '@processpuzzle/shared/util';

enum CounterStates {
  Uninitialized,
  Initialized,
  Counting,
  Done,
  Frozen
}

interface StartNotification {
  name: string;
  leftTime: number;
  Message: string;
}

enum StartSignals {
  WarnSignal = 300,
  PreparatorySignalI = 240,
  OneMinuteSignal = 60,
  StartSignal = 0
}

enum TimeSelectOptions {
  LeftTime = 'LeftTime',
  StopTime = 'StopTime'
}

@Component({
  selector: 'sailrc-race-start-timer',
  templateUrl: './race-start-timer.component.html',
  styleUrls: ['./race-start-timer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RaceStartTimerComponent implements OnDestroy, OnInit {
  countdownConfig: CountdownConfig;
  @ViewChild('countdownComponent', { static: false }) private countdownComponent: CountdownComponent;
  counterState : CounterStates = 0;
  currentTime: string;
  durationInSeconds = 5;
  leftTime = 10;
  startProgress = 0;
  startSignName: string;
  stopTime: number;
  @ViewChild('timePicker') private timePicker: NgxMaterialTimepickerComponent;
  timeSelectMode: TimeSelectOptions = TimeSelectOptions.LeftTime;
  private lastRouteSegment: Observable<string>;
  private readonly onDestroy$ = new Subject<void>();
  private readonly tabName: string

  constructor(
    private lapFacade: LapFacade,
    private _snackBar: MatSnackBar,
    private activeTabService: ActiveTabService,
    private route: ActivatedRoute,
    private routeState: RouteStateService ) {
    this.tabName = 'start-countdown';
    this.lastRouteSegment = this.routeState.subscribeToRouteSegments( RaceStartTimerComponent.name, this.route );
  }

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.activeTabService.tabIsInActive( this.tabName );
    this.onDestroy$.next();
    this.routeState.unsubscribeFromRouteSegments( RaceStartTimerComponent.name );
  }

  ngOnInit(): void {
    this.currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    this.initializeCountdown();
    this.activeTabService.tabIsActive( this.tabName );
    this.subscribeToCurrentLapChanges();
  }
  // endregion

  // event handling methods
  onCountdownEvent( $event: CountdownEvent ) {
    switch( $event.action ) {
      case 'notify':
        switch( $event.left / 1000 ) {
          case StartSignals.WarnSignal:
            this.warnSignal();
            break;
          case StartSignals.PreparatorySignalI:
            this.preparatorySignalI();
            break;
          case StartSignals.OneMinuteSignal:
            this.oneMinuteSignal();
            break;
          case StartSignals.StartSignal:
            this.startSignal();
            break;
        }
        break;
      case 'done':
        if( $event.left == 0 && this.counterState == CounterStates.Counting ) {
          this.startSignal();
        }
        break;
    }
  }

  onLeftTimeSet( $event: any ) {
    this.leftTime = $event.target.value * 60;
    this.setTimer();
  }

  onRecall() {
    if( confirm( 'Are you sure to stop the race? ' )) {
      this.countdownComponent.stop();
      this.counterState = CounterStates.Uninitialized;
      this.startProgress = 0;
    }
  }

  onStartCountdown() {
    this.countdownComponent.begin();
    this.counterState = CounterStates.Counting;
  }

  onStopCountdown() {
    if( confirm( 'Are you sure to stop counting down? ' )) {
      this.startProgress = 0;
      this.countdownComponent.stop();
      this.counterState = CounterStates.Uninitialized;
    }
  }

  onTimePicked( $event: string ) {
    const pickedDate = new Date();
    const hours = Number( $event.substr( 0, 2 ));
    const minutes = Number( $event.substr( 3, 5 ));
    pickedDate.setHours( hours );
    pickedDate.setMinutes( minutes );
    this.stopTime = pickedDate.getTime();
    this.setTimer();
  }
  // endregion

  // region protected, private methods
  private initializeCountdown() {
    this.countdownConfig = {
      demand: true,
      format: 'HH:mm:ss',
      leftTime: 0,
      notify: [StartSignals.WarnSignal, StartSignals.PreparatorySignalI, StartSignals.OneMinuteSignal]
    };
  }

  private notifyUser( message: string, action: string = '' ) {
    this._snackBar.open( message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  private oneMinuteSignal() {
    this.startProgress = 4;
    this.startSignName = 'One Minute';
    this.notifyUser('One minute signal.', '1 Minutes');
  }

  private preparatorySignalI() {
    this.startProgress = 2;
    this.startSignName = 'Preparatory signal I.';
    this.notifyUser( 'Preparatory signal I.', '4 Minutes' );
  }

  private setTimer() {
    if( this.counterState != CounterStates.Counting ){
      switch( this.timeSelectMode ){
        case TimeSelectOptions.LeftTime:
          this.countdownConfig = {...this.countdownConfig, stopTime: undefined, leftTime: this.leftTime };
          break;
        case TimeSelectOptions.StopTime:
          this.countdownConfig = {...this.countdownConfig, stopTime: this.stopTime, leftTime: undefined };
          break;
      }
      this.counterState = CounterStates.Initialized;
      this.updateCurrentLap();
    }
  }

  private startSignal() {
    this.startProgress = 5;
    this.startSignName = 'Start';
    this.counterState = CounterStates.Done;
    this.notifyUser('Start signal.', '0 Minutes');
    timer( 60000 ).subscribe( () => this.counterState = CounterStates.Frozen );
  }

  private subscribeToCurrentLapChanges() {
    this.lapFacade.current$.pipe(
      takeUntil( this.onDestroy$ ),
      map( lap => {
        switch( lap.state ) {
          case LapState.Planned:
            this.startProgress = 0;
            this.leftTime = 0;
            this.stopTime = 0;
            this.counterState = CounterStates.Uninitialized;
            break;
          case LapState.Starting:
            this.leftTime = 0;
            this.stopTime = lap.startTime.getTime();
            this.timeSelectMode = TimeSelectOptions.StopTime;
            this.setTimer();
            break;
          case LapState.Running:
            this.startProgress = 0;
            this.leftTime = 0;
            this.stopTime = 0;
            this.counterState = CounterStates.Done;
            break;
          case LapState.Finished:
          case LapState.Cancelled:
            this.startProgress = 0;
            this.leftTime = 0;
            this.stopTime = 0;
            this.counterState = CounterStates.Frozen;
            break;
        }
      })
    ).subscribe();
  }

  private updateCurrentLap() {
    this.lapFacade.current$.pipe(
      take( 1 ),
      tap( lap => {
        if( this.countdownConfig.stopTime ) {
          lap.startTime = new Date( this.countdownConfig.stopTime );
        } else if( this.countdownConfig.leftTime ) {
          const startTime = new Date();
          startTime.setSeconds( startTime.getSeconds() + this.leftTime );
          console.log( startTime );
          lap.startTime = startTime;
        }

        switch( this.counterState ) {
          case CounterStates.Uninitialized:
          case CounterStates.Initialized:
            lap.state = LapState.Planned;
            break;
          case CounterStates.Counting:
            lap.state = LapState.Starting;
            break;
          case CounterStates.Done:
            lap.state = LapState.Running;
            break;
          case CounterStates.Frozen:
            lap.state = LapState.Finished;
        }
        this.lapFacade.update( lap, lap.raceId );
      })
    ).subscribe();
  }

  private warnSignal() {
    this.startProgress = 1;
    this.startSignName = 'Warning';
    this.notifyUser( 'Warn signal', '5 Minutes' );
  }
  // endregion
}
