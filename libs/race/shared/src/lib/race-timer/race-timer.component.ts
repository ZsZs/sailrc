import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CountdownConfig, CountdownEvent, CountdownStatus } from 'ngx-countdown';
import { Lap, LapFacade, LapState, StartSignals } from '@sailrc/race/domain';
import { CdTimerOptions, CountdownFormFieldComponent } from '@processpuzzle/shared/widgets';
import { NGXLogger } from 'ngx-logger';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import deepEqual from 'deep-equal';

@Component({
  selector: 'sailrc-race-timer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './race-timer.component.html',
  styleUrls: ['./race-timer.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RaceTimerComponent implements OnDestroy, OnInit {
  // region attributes
  private currentLap: Lap;
  @ViewChild('countdownFormFieldComponent', { static: false }) private countdownComponent: CountdownFormFieldComponent;
  countdownConfig: CountdownConfig;
  countupConfig: CdTimerOptions;
  private countdownStatus = CountdownStatus.stop;
  lapState: LapState;
  private readonly onDestroy$ = new Subject<void>();
  raceStartTime: Date;
  raceFinishTimeText: string;
  raceStartTimeText: string;
  @Output() startSignalEvent = new EventEmitter<StartSignals>();
  // endregion

  // region constructors
  constructor(private logger: NGXLogger, private lapFacade: LapFacade) {}
  // endregion

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.initializeCountdown();
    this.initializeCountup();
    this.subscribeToCurrentLapChanges();
  }
  // endregion

  // region event handling methods
  onCountdownEvent($event: CountdownEvent) {
    switch ($event.action) {
      case 'notify':
        switch ($event.left / 1000) {
          case StartSignals.WarnSignal:
            this.startSignalEvent.emit(StartSignals.WarnSignal);
            break;
          case StartSignals.PreparatorySignalI:
            this.startSignalEvent.emit(StartSignals.PreparatorySignalI);
            break;
          case StartSignals.OneMinuteSignal:
            this.startSignalEvent.emit(StartSignals.OneMinuteSignal);
            break;
          case StartSignals.StartSignal:
            this.startSignalEvent.emit(StartSignals.StartSignal);
            break;
          default:
            throw new Error(`Unknown Countdown Event: ${$event}`);
        }
        break;
      case 'done':
        if ($event.left == 0 && this.countdownStatus == CountdownStatus.ing) {
          this.startSignalEvent.emit(StartSignals.StartSignal);
        }
        break;
      case 'pause':
        break;
      case 'restart':
        this.countdownComponent.begin();
        break;
      case 'resume':
        break;
      case 'start':
        this.countdownStatus = $event.status;
        break;
      case 'stop':
        this.countdownStatus = CountdownStatus.stop;
        break;
    }
  }

  onCountupEvent($event: StartSignals) {
    this.startSignalEvent.emit($event);
  }
  // endregion

  // region public accessor methods
  // endregion

  // region protected, private helper methods
  private configureTimers(lap: Lap): void {
    const todayMorning = new Date();
    todayMorning.setHours(0, 0, 0, 0);

    switch (lap.state) {
      case LapState.Planned:
        this.raceStartTimeText = null;
        this.initializeCountdown();
        this.initializeCountup();
        break;
      case LapState.Initialized:
        this.configureCountdown((lap.startTime.getTime() - todayMorning.getTime()) / 1000);
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        break;
      case LapState.Countdown:
        this.configureCountdown((lap.startTime.getTime() - todayMorning.getTime()) / 1000);
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        if (this.countdownComponent) this.countdownComponent.begin();
        break;
      case LapState.Started:
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        break;
      case LapState.Running:
        this.configureCountup((new Date().getTime() - lap.startTime.getTime()) / 1000);
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        break;
      case LapState.Cancelled:
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        this.raceFinishTimeText = lap.finishTime.toISOString().slice(0, 16);
        break;
      case LapState.Finished:
        this.raceStartTimeText = lap.startTime.toISOString().slice(0, 16);
        this.raceFinishTimeText = lap.finishTime.toISOString().slice(0, 16);
        break;
    }

    this.raceStartTime = lap.startTime;
  }

  private configureCountdown(stopTime: number) {
    this.countdownConfig = { ...this.countdownConfig, stopTime, leftTime: undefined };
  }

  private configureCountup(countUpStart: number) {
    this.countupConfig = { ...this.countupConfig, startTime: countUpStart };
  }

  private initializeCountdown() {
    this.countdownConfig = {
      demand: false,
      format: 'HH:mm:ss',
      leftTime: 0,
      notify: [StartSignals.WarnSignal, StartSignals.PreparatorySignalI, StartSignals.OneMinuteSignal],
    };
  }

  private initializeCountup() {
    this.countupConfig = {
      autostart: false,
      format: 'hms',
    };
  }

  private isStartTimeChanged(lap: Lap) {
    return !(lap.startTime && this.raceStartTime && this.raceStartTime.getTime() == lap.startTime.getTime());
  }

  private subscribeToCurrentLapChanges() {
    this.lapFacade.current$
      .pipe(
        takeUntil(this.onDestroy$),
        map((lap) => {
          if (!deepEqual(this.currentLap, lap)) {
            this.currentLap = lap;
            this.updateComponentFromLap(lap);
          }
        })
      )
      .subscribe();
  }

  private updateComponentFromLap(lap: Lap) {
    this.logger.debug(`Update race-timer.component from lap: ${JSON.stringify(lap)}`);

    this.lapState = lap.state;

    if (this.isStartTimeChanged(lap)) this.configureTimers(lap);
  }
  // endregion
}
