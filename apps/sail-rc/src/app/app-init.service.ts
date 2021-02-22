import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInitService {

 init() {
   const apiKey = environment.googleCloudPlatform.apiKey;
   const mapsAPIUrl =`/google/maps/api/js?key=${apiKey}`;

   console.log( mapsAPIUrl );
    // return this.httpClient.jsonp( mapsAPIUrl, 'callback' ).toPromise().then( async x => {
    //   await new Promise( resolve => setTimeout( resolve, 5000 ));
    //   console.log( 'Google Maps API loaded.');
    // });
  }
}
