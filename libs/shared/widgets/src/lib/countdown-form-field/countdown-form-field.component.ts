import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

export const defaultCountdownConfig: CountdownConfig = {
  demand: false,
  leftTime: 0,
  stopTime: undefined,
  format: 'HH:mm:ss',
  prettyText: undefined,
  notify: undefined,
  timezone: '+0000',
};

@Component({
  selector: 'sailrc-countdown-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './countdown-form-field.component.html',
  styleUrls: ['./countdown-form-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [{ provide: MatFormFieldControl, useExisting: CountdownFormFieldComponent }],
})
export class CountdownFormFieldComponent implements MatFormFieldControl<CountdownConfig>, OnDestroy {
  // region attributes
  private static nextId = 0;
  private _countdownConfig = defaultCountdownConfig;
  private _placeholder: string;
  @ViewChild('countdownComponent', { static: false }) private countdownComponent: CountdownComponent;
  @Output() countdownEvent = new EventEmitter<CountdownEvent>();
  readonly controlType = 'countdown-form-field';
  readonly disabled = false;
  readonly errorState = false;
  focused: boolean;
  @HostBinding() id = `countdown-form-field-${CountdownFormFieldComponent.nextId++}`;
  readonly ngControl: NgControl | null = null;
  readonly required: boolean;
  shouldLabelFloat = false;
  readonly stateChanges = new Subject<void>();
  readonly userAriaDescribedBy: string;
  // endregion

  // region angular life cycle events
  ngOnDestroy() {
    this.stateChanges.complete();
  }
  // endregion

  // region event handling methods
  onCountdownEvent($event: CountdownEvent) {
    //    console.log( $event );
    this.countdownEvent.emit($event);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onContainerClick(event: MouseEvent): void {
    // no operation is needed
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDescribedByIds(ids: string[]): void {
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
  public begin() {
    this.countdownComponent.begin();
  }

  public stop() {
    this.countdownComponent.stop();
  }
  // endregion

  // region properties
  get empty() {
    return false;
  }

  get placeholder() {
    return this._placeholder;
  }

  @Input() set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get value() {
    return this._countdownConfig;
  }

  @Input() set value(countdownConfig: CountdownConfig | null) {
    if (countdownConfig) {
      this._countdownConfig = { ...this._countdownConfig, ...countdownConfig };
      this.stateChanges.next();
    }
  }
  // endregion
}
