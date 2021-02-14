import { AfterViewInit, Directive, forwardRef, OnDestroy } from '@angular/core';
import { FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Subscription } from 'rxjs';
import { MapSelectComponent } from './map-select.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'sailrc-map-select[ngrxFormControlState]',
  providers: [{
    provide: NGRX_FORM_VIEW_ADAPTER,
    useExisting: forwardRef(() => MapSelectViewAdapter ),
    multi: true,
  }],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MapSelectViewAdapter implements FormViewAdapter, AfterViewInit, OnDestroy {
  private value: any;
  private subscriptions: Subscription[] = [];

  constructor(private mapSelect: MapSelectComponent ) {}

  ngAfterViewInit() {
    console.log('map-select: ngAfterViewInit');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setViewValue(value: any) {
    this.value = value;

    Promise.resolve().then(() => {
      this.mapSelect.center = value;
      this.mapSelect.markerPosition = value;
    });
  }

  setOnChangeCallback(fn: any) {
    this.mapSelect.registerOnChange(value => {
      this.value = value;
      fn(value);
    });
  }

  setOnTouchedCallback(fn: any) {
    console.log('map-select: setOnTouchedCallback = ' + fn );
  }

  setIsDisabled(isDisabled: boolean) {
    console.log('map-select setIsDisabled');
  }
}
