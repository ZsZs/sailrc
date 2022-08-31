import { Component, ElementRef, HostBinding, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateTime } from 'ts-luxon';
import { NgxMatTimepickerFieldComponent } from 'ngx-mat-timepicker';

@Component({
  selector: 'sailrc-timepicker-form-field',
  templateUrl: './timepicker-form-field.component.html',
  styleUrls: ['./timepicker-form-field.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [{provide: MatFormFieldControl, useExisting: TimepickerFormFieldComponent}]
})
export class TimepickerFormFieldComponent implements MatFormFieldControl<any>, OnDestroy {
  // region attributes
  private static nextId = 0;
  private _placeholder: string;
  readonly controlType = 'countdown-form-field';
  @Input() disabled = false;
  readonly errorState = false;
  focused: boolean;
  @Input() format: string;
  @HostBinding() id = `countdown-form-field-${TimepickerFormFieldComponent.nextId++}`;
  @Input() min: number;
  readonly ngControl: NgControl | null = null;
  readonly required: boolean;
  shouldLabelFloat = false;
  readonly stateChanges = new Subject<void>();
  @ViewChild( NgxMatTimepickerFieldComponent, { read: ElementRef, static: true} ) timePicker: ElementRef;
  readonly userAriaDescribedBy: string;
  // endregion

  // region angular life cycle events
  ngOnDestroy() {
    this.stateChanges.complete();
  }

  // endregion

  // region event handling methods
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
    return null;
  }

  @Input() set value( earliestDateTime: number | null) {
//    this.timePicker.nativeElement.min = DateTime.utc( earliestDateTime );
//    this.stateChanges.next();
  }
  // endregion
}
