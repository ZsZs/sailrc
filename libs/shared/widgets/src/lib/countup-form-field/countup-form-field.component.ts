import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { StartSignals } from '@sailrc/race/domain';

export interface CdTimerOptions {
  startTime?: number;
  endTime?: number;
  countdown?: boolean;
  autostart?: boolean;
  maxTimeUnit?: string;
  format?: string;
}

export const defaultCdTimerOptions: CdTimerOptions = {
  startTime: 0,
  endTime: 0,
  countdown: false,
  autostart: true,
  maxTimeUnit: 'day',
  format: 'hms'
}

@Component({
  selector: 'sailrc-countup-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countup-form-field.component.html',
  styleUrls: ['./countup-form-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [{provide: MatFormFieldControl, useExisting: CountupFormFieldComponent}]
})
export class CountupFormFieldComponent implements MatFormFieldControl<CdTimerOptions>, OnDestroy, OnInit {
  // region attributes
  private static nextId = 0;
  private cdTimerOptions = defaultCdTimerOptions;
  private _placeholder: string;
  @ViewChild('cdTimerComponent', { static: false }) private cdTimerComponent: CdTimerComponent;
  @Output() countupEvent = new EventEmitter<StartSignals>();
  @Output() completeEVent = new EventEmitter<void>();
  @Output() startEvent = new EventEmitter<void>();
  @Output() stopEvent = new EventEmitter<void>();
  readonly controlType = 'cdtimer-form-field';
  readonly disabled = false;
  readonly errorState = false;
  focused: boolean;
  @HostBinding() id = `cdtimer-form-field-${CountupFormFieldComponent.nextId++}`;
  readonly ngControl: NgControl | null = null;
  readonly required: boolean;
  shouldLabelFloat = false;
  readonly stateChanges = new Subject<void>();
  readonly userAriaDescribedBy: string;
  // endregion
  // region cd-timer attributes
  startTime?: number;
  endTime?: number;
  countdown?: boolean;
  autostart?: boolean;
  maxTimeUnit?: string;
  format?: string;
  // endregion

  // region angular life cycle events
  ngOnDestroy() {
    this.stateChanges.complete();
  }

  ngOnInit(): void {
    this.mapCdTimerOptionsToAttributes( defaultCdTimerOptions );
  }
  // endregion

  // region event handling methods
  onCompleteEvent( $event: CdTimerComponent ) {
    this.completeEVent.emit();
  }

  onStartEvent( $event: CdTimerComponent ) {
    this.startEvent.emit();
  }

  onStopEvent( $event: CdTimerComponent ) {
    this.stopEvent.emit();
  }

  onTickEvent($event: TimeInterface) {
    if ( $event.days == 0 && $event.hours == 0 && $event.minutes == 1 && $event.seconds == 0 ) {
      this.countupEvent.emit( StartSignals.RecallSignal );
    }
  }

  onContainerClick( event: MouseEvent ): void {
    // no operation is needed
  }

  setDescribedByIds( ids: string[] ): void {
    // no operation is needed
  }

  onMouseOut() {
    this.focused = false;
    this.shouldLabelFloat = false;
  }

  onMouseOver() {
    this.focused = true;
    this.shouldLabelFloat = true;
  }
  // endregion

  // region public accessors and mutators
  public start() {
    this.cdTimerComponent.start();
  }

  public stop() {
    this.cdTimerComponent.stop();
  }
  // endregion

  // region protected, private helper methods
  private mapCdTimerOptionsToAttributes( cdTimerOptions: CdTimerOptions ) {
    this.startTime = cdTimerOptions.startTime;
    this.endTime = cdTimerOptions.endTime;
    this.countdown = cdTimerOptions.countdown;
    this.autostart = cdTimerOptions.autostart;
    this.format = cdTimerOptions.format;
    this.maxTimeUnit = cdTimerOptions.maxTimeUnit;
  }
  // endregion

  // region properties
  get empty() {
    return false;
  }

  get placeholder() {
    return this._placeholder;
  }

  @Input() set placeholder( placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get value() {
    return this.cdTimerOptions;
  }

  @Input() set value( cdTimerOptions: CdTimerOptions | null) {
    this.cdTimerOptions = cdTimerOptions;
    this.mapCdTimerOptionsToAttributes( cdTimerOptions );
    this.stateChanges.next();
  }
  // endregion
}
