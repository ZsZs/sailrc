import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

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
export class StartTimePickerComponent implements OnInit {
  currentTime: string;
  @Input() showControls = true;
  leftTime: number;
  @Output() startTimeEvent = new EventEmitter<Date>();
  @Input() stopTime: number;
  timeSelectMode: TimeSelectOptions = TimeSelectOptions.LeftTime;

  // region static methods
  private static calculateCurrentTime(): string {
    return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  }
  // endregion

  // region constructors
  // endregion

  // region angular lifecycle hooks
  ngOnInit(): void {
    this.currentTime = StartTimePickerComponent.calculateCurrentTime();
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

  // region public accessors and mutators
  /*
  @Input() public updateComponentFromLap(lap: Lap) {
    this.logger.debug(`Update start-time-picker.component from lap: ${JSON.stringify(lap)}`);
    if (lap.startTime && lap.state == LapState.Initialized) {
      this.stopTime = lap.startTime.getMilliseconds();
      this.showControls = lap.state;
    }
  }
  */
  // endregion

  // region protected, private methods
  // endregion
}
