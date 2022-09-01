import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Lap, LapFacade, LapState } from '@sailrc/race/domain';
import { NGXLogger } from 'ngx-logger';
import { map, takeUntil } from 'rxjs/operators';
import deepEqual from 'deep-equal';
import { Subject } from 'rxjs';

enum TimeSelectOptions {
  LeftTime = 'LeftTime',
  StopTime = 'StopTime',
}

@Component({
  selector: 'sailrc-start-time-picker',
  templateUrl: './start-time-picker.component.html',
  styleUrls: ['./start-time-picker.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class StartTimePickerComponent implements OnDestroy, OnInit {
  currentLap: Lap;
  currentTime: string;
  lapState: LapState;
  leftTime: number;
  @Output() startTimeEvent = new EventEmitter<Date>();
  private readonly onDestroy$ = new Subject<void>();
  stopTime: number;
  timeSelectMode: TimeSelectOptions = TimeSelectOptions.LeftTime;

  // region static methods
  private static calculateCurrentTime(): string {
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
  // endregion

  // region constructors
  constructor(private logger: NGXLogger, private lapFacade: LapFacade) {}
  // endregion

  // region angular lifecycle hooks
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  ngOnInit(): void {
    this.currentTime = StartTimePickerComponent.calculateCurrentTime();
    this.subscribeToCurrentLapChanges();
  }
  // endregion

  // region event handling methods
  onLeftTimeSet($event: Event) {
    const input = $event.target as HTMLInputElement;
    this.leftTime = Number(input.value);
  }

  onSetStartTime() {
    const now = new Date();
    switch (this.timeSelectMode) {
      case TimeSelectOptions.LeftTime:
        now.setMilliseconds(0);
        now.setSeconds(0);
        now.setMinutes(now.getMinutes() + this.leftTime);
        this.startTimeEvent.emit(now);
        break;
      case TimeSelectOptions.StopTime:
        this.startTimeEvent.emit(new Date(this.stopTime));
        break;
    }
    this.stopTime = undefined;
    this.leftTime = undefined;
  }

  onTimePicked($event: string) {
    const pickedDate = new Date();
    const hours = Number($event.substr(0, 2));
    const minutes = Number($event.substr(3, 5));
    pickedDate.setHours(hours);
    pickedDate.setMinutes(minutes);
    pickedDate.setSeconds(0);
    this.stopTime = pickedDate.getTime();
  }
  // endregion

  // region protected, private methods
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
    this.logger.debug(`Update start-time-picker.component from lap: ${JSON.stringify(lap)}`);
    if (lap.startTime && lap.state == LapState.Initialized) {
      this.stopTime = lap.startTime.getMilliseconds();
      this.lapState = lap.state;
    }
  }
  // endregion
}
