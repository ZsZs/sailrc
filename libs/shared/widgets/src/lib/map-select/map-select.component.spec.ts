import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectComponent } from './map-select.component';
import { GoogleMapsService } from '../services/google-maps-service';
import { GoogleMapsServiceStub} from "../../test-setup";
import { GoogleMap } from '@angular/google-maps';
import { Component, Input, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import LatLngLiteral = google.maps.LatLngLiteral;
import MapMouseEvent = google.maps.MapMouseEvent;
import IconMouseEvent = google.maps.IconMouseEvent;
import { initialize, mockInstances } from "@googlemaps/jest-mocks";

describe('MapSelectComponent', () => {
  const latLng: google.maps.LatLng = {
    lat(): number {
      return -34
    },
    lng(): number {
      return 151;
    },
    toJSON(): LatLngLiteral {
      return { lat: -34, lng: 151 }
    }, toString: null, toUrlValue: null, equals: null
  };
  const mouseEvent: MapMouseEvent = { latLng, stop: null, domEvent: null };
  let component: MapSelectComponent;
  let googleMapComponent: GoogleMap;
  let googleMapStubComponent: GoogleMapStubComponent;
  let fixture: ComponentFixture<MapSelectComponent>;

  // eslint-disable-next-line @angular-eslint/component-selector
  @Component({selector: 'google-map', template: ''})
  class GoogleMapStubComponent implements Partial<GoogleMap>{
    @Input() public options;
    @Input() public center;
    @Input() public zoom;
    @Output() public mapClick: Subject<MapMouseEvent | IconMouseEvent> = new Subject();
    @Output() public mapMousemove: Observable<MapMouseEvent> = new Subject();
    bounds: google.maps.LatLngBounds;
    emitMapClickEvent( mouseEvent: MapMouseEvent ) {
      this.mapClick.next( mouseEvent );
    }

    fitBounds( bounds: google.maps.LatLngBounds ) {
      this.bounds = bounds;
    }
  }

  beforeEach(async () => {
    initialize();

    await TestBed.configureTestingModule({
      declarations: [ MapSelectComponent, GoogleMapStubComponent ],
      imports: [],
      providers: [{provide: GoogleMapsService, useClass: GoogleMapsServiceStub}, HttpClient]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    googleMapComponent = fixture.debugElement.query( By.directive( GoogleMapStubComponent )).componentInstance;
    googleMapStubComponent = fixture.debugElement.query( By.directive( GoogleMapStubComponent )).componentInstance;
  });

  afterEach( () => {
    mockInstances.clearAll();

    Object.defineProperty( googleMapComponent, 'mapClick', {
      configurable: false,
      writable: false
    })

  });

  it('should create component and its child component', () => {
    expect(component).toBeTruthy();
    expect(googleMapComponent).toBeTruthy();
  });

  it( 'passes inputs to Google Map Component', () => {
    expect(googleMapComponent.options).toStrictEqual( { center: { lat: 49, lng: 10.11 }, zoom: 4 } );
    expect(googleMapComponent.center).toStrictEqual( { lat: 49, lng: 10 } );
    expect(googleMapComponent.zoom).toBe(4 );
  })

  it( 'listens to mapClick event and calls addMarker(), calculateCenter(), _onChange()', done => {
    Object.defineProperty( googleMapComponent, 'mapClick', { writable: true })
    jest.spyOn( component, 'onMapClick' );
    jest.spyOn( component, 'addMarker' );
    jest.spyOn( googleMapComponent, 'fitBounds' );
    googleMapComponent.mapClick.subscribe( mapMouseEvent => {
      expect( mapMouseEvent ).toStrictEqual( mouseEvent );
      expect( component.onMapClick ).toBeCalled();
      expect( component.addMarker ).toBeCalled();
      expect( googleMapComponent.fitBounds ).toBeCalled();
      done();
    })
    googleMapStubComponent.emitMapClickEvent( mouseEvent );
  })
});
