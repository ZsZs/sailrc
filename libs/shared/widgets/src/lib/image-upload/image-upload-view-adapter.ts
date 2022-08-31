import { FormViewAdapter, NGRX_FORM_VIEW_ADAPTER } from 'ngrx-forms';
import { AfterViewInit, Directive, forwardRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageUploadComponent } from './image-upload.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'sailrc-image-upload[ngrxFormControlState]',
  providers: [{
    provide: NGRX_FORM_VIEW_ADAPTER,
    useExisting: forwardRef(() => ImageUploadViewAdapter ),
    multi: true,
  }],
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ImageUploadViewAdapter implements FormViewAdapter, AfterViewInit, OnDestroy {
  private value: any;
  private subscriptions: Subscription[] = [];

  constructor(private imageUpload: ImageUploadComponent ) {}

  ngAfterViewInit() {
    console.log('image-upload: ngAfterViewInit');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setViewValue(value: any) {
    this.value = value;

    Promise.resolve().then(() => this.imageUpload.imageUrl = value);
  }

  setOnChangeCallback(fn: any) {
    this.imageUpload.registerOnChange(value => {
      this.value = value;
      fn(value);
    });
  }

  setOnTouchedCallback(fn: any) {
    console.log('image-upload: setOnTouchedCallback = ' + fn );
  }

  setIsDisabled(isDisabled: boolean) {
    console.log('image-upload: setIsDisabled');
  }
}
