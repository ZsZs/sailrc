import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppInitService {

  constructor( private httpClient: HttpClient ) {}

  init() {
   const apiKey = environment.googleCloudPlatform.apiKey;
   const mapsAPIUrl =`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    return this.httpClient.jsonp( mapsAPIUrl, 'callback' ).toPromise().then( async x => {
      await new Promise( resolve => setTimeout( resolve, 5000 ));
      console.log( 'Google Maps API loaded.');
    });
  }
}
