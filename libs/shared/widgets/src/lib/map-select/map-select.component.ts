import { Component, Inject, InjectionToken, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export const GOOGLE_API_KEY_TOKEN = new InjectionToken<string>('googleAPIKey' );

@Component({
  selector: 'sailrc-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MapSelectComponent implements OnChanges {
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 49, lng: 10 };
  @Input() disableAddMarker = false;
  display: any;
  @ViewChild('googleMap') googleMap: google.maps.Map;
  mapOptions: google.maps.MapOptions = { center: { lat: 49, lng: 10.11 }, zoom: 4 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  @Input() mapMarkers: google.maps.Marker[];
  zoom = 4;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: any) => void = () => {};

  constructor( @Inject(GOOGLE_API_KEY_TOKEN) googleAPIKey: string, private httpClient: HttpClient ) {
//    this.loadGoogleMapsAPI( googleAPIKey );
  }

  // region Angular lifecycle event hooks
  ngOnChanges(): void {
    this.calculateCenter();
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

  private loadGoogleMapsAPI( googleAPIKey: string ) {
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;

    this.apiLoaded = this.httpClient.jsonp( mapsAPIUrl, 'callback' ).pipe(
      map( () => true ),
      catchError( () => of( false ) )
    );
  }
  // endregion
}
