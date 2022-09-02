import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraUploadComponent } from './camera-upload.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { WebcamImage, WebcamModule, WebcamUtil } from 'ngx-webcam';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
//import fetch from 'jest-fetch-mock'

describe('CameraUploadComponent', () => {
  let component: CameraUploadComponent;
  let fixture: ComponentFixture<CameraUploadComponent>;

  const matDialogRef = {
    close(dialogResult?: any) {
      console.log('Stub close() has been called.');
    },
  };
  const data = { titleText: 'hello' };
  const closeSpy = jest.spyOn(matDialogRef, 'close');
  const getAvailableVideoInputsSpy = jest.spyOn(WebcamUtil, 'getAvailableVideoInputs').mockReturnValue(
    new Promise((resolve, reject) => {
      resolve([
        { deviceId: 'a', groupId: 'b', kind: 'videoinput', label: '', toJSON() { this.kind; }},
        { deviceId: 'a', groupId: 'b', kind: 'videoinput', label: '', toJSON() { this.kind; }},
      ]);
      reject();
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameraUploadComponent],
      imports: [FlexModule, MatDialogModule, SharedMaterialModule, WebcamModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraUploadComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'getWindowInnerHeight').mockReturnValue(1000);
    jest.spyOn(component, 'getWindowInnerWidth').mockReturnValue(1000);

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() determines webcam height and width', () => {
    expect(component.webcamHeight).toEqual(680);
    expect(component.webcamWidth).toEqual(800);
  });

  it('ngOnInit() determines title', () => {
    expect(component.title).toEqual('hello');
  });

  it('ngOnInit() determines if multiple cameras are available', () => {
    expect(component.multipleWebcamsAvailable).toBeTruthy();
    expect(getAvailableVideoInputsSpy).toHaveBeenCalled();
  });

  it('onCancel() closes the dialog', () => {
    component.onCancel();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('onSave() closes the dialog with the images data and url', async() => {
    const arr = new Uint8ClampedArray( 400 );
    for( let i = 0; i < arr.length; i += 4 ) {
      arr[ i ] = 0;    // R value
      arr[ i + 1 ] = 190;  // G value
      arr[ i + 2 ] = 0;    // B value
      arr[ i + 3 ] = 255;  // A value
    }
    const imageData = new ImageData( arr, 20 );
    const imageDataBlob = new Blob([JSON.stringify(imageData)], { type: 'application/json'});
    const webcamImage = new WebcamImage( 'http://localhost/image', 'jpeg', imageData );
    const response: Response = new Response( JSON.stringify( imageData ));

    jest.spyOn( response, 'blob').mockReturnValue( new Promise( (resolve, reject ) => {
      resolve( imageDataBlob );
      reject();
    }));

    global.fetch = jest.fn(() =>
      Promise.resolve( response )
    );

    component.handleImage( webcamImage );
    await component.onSave();

    expect( closeSpy ).toHaveBeenCalledWith( { imageData: imageDataBlob, imageUrl: 'http://localhost/image' } );
  });
});
