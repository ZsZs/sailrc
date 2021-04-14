import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const GOOGLE_API_KEY_TOKEN = new InjectionToken<string>('googleAPIKey' );

@Injectable({providedIn: 'root'}) export class GoogleMapsService {

  constructor( @Inject(GOOGLE_API_KEY_TOKEN) private googleAPIKey: string, private httpClient: HttpClient ) {}

  loadGoogleMapsAPI(): Observable<boolean> {
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleAPIKey}`;

    return this.httpClient.jsonp( mapsAPIUrl, 'callback' ).pipe(
      map( () => true ),
      catchError( () => of( false ) )
    );
  }
}
