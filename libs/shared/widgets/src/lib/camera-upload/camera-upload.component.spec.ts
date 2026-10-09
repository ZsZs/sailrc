import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraUploadComponent } from './camera-upload.component';
import { SharedMaterialModule } from '@processpuzzle/shared/material';
import { FlexModule } from '@angular/flex-layout';
import { WebcamComponent, WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { findComponent, findComponentElement } from '@sailrc/shared/test-util';

describe('CameraUploadComponent', () => {
  let component: CameraUploadComponent;
  let fixture: ComponentFixture<CameraUploadComponent>;
  let webcamElement: DebugElement;
  let webcamComponent: WebcamComponent;

  const matDialogRef = {
    close(dialogResult?: any) { /* do nothing */ },
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
  const imageData = createImageData();
  const imageDataBlob = new Blob([JSON.stringify(imageData)], { type: 'application/json'});
  const webcamImage = new WebcamImage( 'http://localhost/image', 'jpeg', imageData );

  // eslint-disable-next-line @angular-eslint/component-selector
  @Component({selector: 'webcam', template: ''})
  class WebcamStubComponent implements Partial<WebcamComponent>{
    private _trigger: Observable<any>;
    @Input() public height = 480;
    @Input() public width = 640;
    @Input() public imageQuality: number;
    @Output() public imageCapture: EventEmitter<WebcamImage> = new EventEmitter<WebcamImage>();
    @Output() public initError: EventEmitter<WebcamInitError> = new EventEmitter<WebcamInitError>();

    public get trigger(): Observable<any> { return this._trigger; }
    @Input() public set trigger(trigger: Observable<void>) { this._trigger = trigger; }
  }

  beforeAll( () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameraUploadComponent, WebcamStubComponent],
      imports: [FlexModule, MatDialogModule, SharedMaterialModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraUploadComponent);
    component = fixture.componentInstance;
    webcamElement = findComponentElement( fixture, 'webcam' );
    webcamComponent = findComponent<CameraUploadComponent>( fixture, WebcamStubComponent );
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

  it( 'contains WebcamComponent', () => {
    expect( webcamElement ).toBeTruthy();
    expect( webcamComponent ).toBeTruthy();
  })

  it('ngOnInit() determines webcam height and width', () => {
    expect(component.webcamHeight).toEqual(680);
    expect(component.webcamWidth).toEqual(800);
  });

  it( 'passes height & width to webcamComponent', () => {
    expect( webcamComponent.height ).toBe( 680 );
    expect( webcamComponent.width ).toBe( 800 );
  })

  it( 'get triggerObservable() binds trigger:Subject to webcamComponent', () => {
    expect( webcamComponent.trigger ).toEqual( component.triggerObservable );
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

  it( 'triggerSnapshot() fires trigger: Subject', done => {
    webcamComponent.trigger.subscribe( trigger => {
      expect( trigger ).toBeUndefined();
      done();
    })
    component.triggerSnapshot();
  })

  it( 'if webcamComponent fires imageCapture Event, calls handleImage()', () => {
    jest.spyOn( component, 'handleImage' );
    webcamComponent.imageCapture.emit( webcamImage );
    expect( component.handleImage ).toHaveBeenCalledWith( webcamImage );
  })

  function createImageData(): ImageData {
    const arr = new Uint8ClampedArray( 400 );
    for( let i = 0; i < arr.length; i += 4 ) {
      arr[ i ] = 0;    // R value
      arr[ i + 1 ] = 190;  // G value
      arr[ i + 2 ] = 0;    // B value
      arr[ i + 3 ] = 255;  // A value
    }
    return  new ImageData( arr, 20 );
  }
});
