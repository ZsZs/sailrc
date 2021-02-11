import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInitService {

  constructor( private httpClient: HttpClient ) {}

  init() {
    const apiKey = environment.googleCloudPlatform.apiKey;
    const mapsAPIUrl =`/google/maps/api/js?key=${apiKey}`;

    this.httpClient.jsonp( mapsAPIUrl, 'callback' ).subscribe( async x => {
      await new Promise( resolve => setTimeout( resolve, 5000 ));
      console.log( 'Google Maps API loaded.');
    });
  }
}
