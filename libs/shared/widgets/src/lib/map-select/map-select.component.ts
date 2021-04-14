import { Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsService } from '../services/google-maps-service';
import { filter } from 'rxjs/operators';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'sailrc-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MapSelectComponent implements OnChanges, OnInit {
  apiLoaded: boolean;
  center: {lat: 49, lng: 10 };
  @Input() disableAddMarker = false;
  display: any;
  @ViewChild('googleMap') googleMap: GoogleMap;
  mapOptions: google.maps.MapOptions = { center: { lat: 49, lng: 10.11 }, zoom: 4 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  @Input() mapMarkers: google.maps.Marker[];
  zoom = 4;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: any) => void = () => {};

  constructor( private googleMapsService: GoogleMapsService, private httpClient: HttpClient ) {}

  // region Angular lifecycle event hooks
  ngOnChanges(): void {
    this.calculateCenter();
  }

  ngOnInit() {
    this.googleMapsService.loadGoogleMapsAPI().pipe(
      filter( isLoaded => isLoaded )
    ).subscribe( () => this.apiLoaded = true );
  }
  // endregion

  // region event handling methods
  onMapClick( event: google.maps.MapMouseEvent) {
    if( !this.disableAddMarker ) {
      const marker = new google.maps.Marker({ position: event.latLng.toJSON() });
      this.mapMarkers.push( marker );
      this.calculateCenter();
      this._onChange( marker );
    }
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }
  // endregion

  // region public accessors and mutators
  public registerOnChange( fn: (value) => void ) {
    this._onChange = fn;
  }
  // endregion

  // region protected, private helper methods
  private calculateCenter() {
    if( this.googleMap && this.mapMarkers && this.mapMarkers.length > 0 ) {
      const bounds = new google.maps.LatLngBounds();
      this.mapMarkers.forEach( markerPosition => {
        const position = new google.maps.LatLng( markerPosition.getPosition().lat(), markerPosition.getPosition().lng() );
        bounds.extend( position );
      });
      this.googleMap.fitBounds(bounds);
    }
  }
  // endregion
}
