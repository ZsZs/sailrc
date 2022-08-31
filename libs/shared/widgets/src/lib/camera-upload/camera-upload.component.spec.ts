import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraUploadComponent } from './camera-upload.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { WebcamImage, WebcamModule, WebcamUtil } from 'ngx-webcam';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('CameraUploadComponent', () => {
  let component: CameraUploadComponent;
  let fixture: ComponentFixture<CameraUploadComponent>;

  const matDialogRef = {
    close( dialogResult?: any ) {
      console.log('Stub close() has been called.');
    },
  };
  const data = { titleText: 'hello' }
  const closeSpy = jest.spyOn( matDialogRef, 'close' );
  const getAvailableVideoInputsSpy = jest.spyOn( WebcamUtil, 'getAvailableVideoInputs').mockReturnValue(
    new Promise((resolve, reject) => {
      resolve( [
        { deviceId: 'a', groupId: 'b', kind: 'videoinput', label: '', toJSON() {this.kind}},
        { deviceId: 'a', groupId: 'b', kind: 'videoinput', label: '', toJSON() {this.kind}}] );
      reject();
    }));
//  const okResponse = new Response(JSON.stringify({}), { status: 200, statusText: 'OK', });
  global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject) => {
    resolve(new Response('hello', { status: 200, statusText: 'OK', }));
    reject();
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraUploadComponent ],
      imports: [FlexModule, MatDialogModule, SharedMaterialModule, WebcamModule],
      providers: [{ provide: MatDialogRef, useValue: matDialogRef }, { provide: MAT_DIALOG_DATA, useValue: data }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraUploadComponent);
    component = fixture.componentInstance;
    spyOn( component, 'getWindowInnerHeight').and.returnValue( 1000 )
    spyOn( component, 'getWindowInnerWidth').and.returnValue( 1000 )

    fixture.detectChanges();
  });

  afterAll(() => {
    delete global.fetch;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it( 'ngOnInit() determines webcam height and width', () => {
    expect( component.webcamHeight ).toEqual(680);
    expect( component.webcamWidth ).toEqual(800);
  })

  it( 'ngOnInit() determines title', () => {
    expect( component.title ).toEqual('hello' );
  })

  it( 'ngOnInit() determines if multiple cameras are available', () => {
    expect( component.multipleWebcamsAvailable ).toBeTruthy();
    expect( getAvailableVideoInputsSpy ).toHaveBeenCalled();
  })

  it( 'onCancel() closes the dialog', () => {
    component.onCancel();
    expect( closeSpy ).toHaveBeenCalled();
  })

  it('onSave() closes the dialog with the images data and url', () => {
    const imageData: ImageData = {data: new Uint8ClampedArray(100), height: 100, width: 100 }
    const webcamImage = new WebcamImage( 'http://localhost/image', 'jpeg', imageData )

    component.handleImage( webcamImage );
    component.onSave();

    expect( closeSpy ).toHaveBeenCalledWith( imageData, 'http://localhost/image' );
  })
});
