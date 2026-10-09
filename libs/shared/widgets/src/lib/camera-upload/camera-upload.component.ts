import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

export interface DialogData {
  titleText: string;
  height: string;
  width: string;
}

export interface DialogResult {
  imageData: Blob;
  imageUrl: string;
}

@Component({
  selector: 'sailrc-camera-upload',
  templateUrl: './camera-upload.component.html',
  styleUrls: ['./camera-upload.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CameraUploadComponent implements OnInit {
  public errors: WebcamInitError[] = [];
  public multipleWebcamsAvailable = false;
  public title: string;
  public webcamHeight: any;
  public webcamImage: WebcamImage = null;
  public webcamWidth: any;
  private trigger: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<CameraUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  // region angular life cycle events
  ngOnInit(): void {
    this.title = this.data.titleText;
    this.determineWebcamSize();
    this.determineVideoInputs();
  }
  // endregion

  // region event handling methods
  onCancel(): void {
    this.dialogRef.close();
  }

  async onSave() {
    const imageUrl = this.webcamImage.imageAsDataUrl;
    const imageData = <Blob>await this.convertBase64ToBlob(imageUrl);
    this.dialogRef.close({ imageData, imageUrl });
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }
  // endregion

  // region public accessors and mutators
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  // endregion

  // region protected, private helper methods
  private async convertBase64ToBlob(base64Data: string): Promise<Blob> {
    const base64Response = await fetch(base64Data);
    return await base64Response.blob();
  }

  private determineWebcamSize() {
    const windowHeight = this.getWindowInnerHeight();
    const windowWidth = this.getWindowInnerWidth();
    this.webcamHeight = windowHeight - windowHeight * 0.32;
    this.webcamWidth = windowWidth - windowWidth * 0.2;
  }

  private determineVideoInputs() {
    WebcamUtil.getAvailableVideoInputs().then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
  }

  // helper function to facilitate unit test
  /* istanbul ignore next */
  getWindowInnerHeight() { return window.innerHeight; }
  /* istanbul ignore next */
  getWindowInnerWidth() { return window.innerWidth; }
  // endregion
}
