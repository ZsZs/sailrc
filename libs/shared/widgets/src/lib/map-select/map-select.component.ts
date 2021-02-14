import { Component, Inject, InjectionToken, Input, ViewEncapsulation } from '@angular/core';
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
export class MapSelectComponent {
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  display: any;
  mapOptions: google.maps.MapOptions = { center: { lat: 40, lng: -20 }, zoom: 4 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral;
  zoom = 11;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (value: any) => void = () => {};

  constructor( @Inject(GOOGLE_API_KEY_TOKEN) googleAPIKey: string, private httpClient: HttpClient ) {
    this.loadGoogleMapsAPI( googleAPIKey );
  }

  // region Angular lifecycle event hooks
  // endregion

  // region event handling methods
  onMapClick( event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
    this.markerPosition = this.center;
    this._onChange( this.center );
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
  private loadGoogleMapsAPI( googleAPIKey: string ) {
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}`;

    this.apiLoaded = this.httpClient.jsonp( mapsAPIUrl, 'callback' ).pipe(
      map( () => true ),
      catchError( () => of( false ) )
    );
  }
  // endregion
}
