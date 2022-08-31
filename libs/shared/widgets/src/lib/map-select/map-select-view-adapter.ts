import { Directive, forwardRef, OnDestroy } from '@angular/core';
import { FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { Subscription } from 'rxjs';
import { MapSelectComponent } from './map-select.component';
import { ICoordinates } from './coordinates';
import { GoogleMapsService } from '../services/google-maps-service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'sailrc-map-select[ngrxFormControlState]',
  providers: [
    {
      provide: NGRX_FORM_VIEW_ADAPTER,
      useExisting: forwardRef(() => MapSelectViewAdapter),
      multi: true,
    },
  ],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class MapSelectViewAdapter implements FormViewAdapter, OnDestroy {
  private apiLoaded: boolean;
  private subscriptions: Subscription[] = [];
  private value: ICoordinates;

  constructor(private googleMapsService: GoogleMapsService, private mapSelect: MapSelectComponent) {}

  // region angular lifecycle hooks
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  // endregion

  // region overloaded methods
  setViewValue(value: ICoordinates) {
    this.value = value;
    Promise.resolve().then(() => {
      this.mapSelect.addMarker(value);
    });
  }

  setOnChangeCallback(fn: any) {
    this.mapSelect.registerOnChange((value) => {
      this.value = value;
      fn(value);
    });
  }

  setOnTouchedCallback(fn: any) {
    //    console.log('map-select: setOnTouchedCallback = ' + fn );
  }

  // region protected, private helper methods
  // endregion
}
