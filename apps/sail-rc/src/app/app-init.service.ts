import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInitService {

 init() {
  const apiKey = environment.googleCloudPlatform.apiKey;
  const mapsAPIUrl =`/google/maps/api/js?key=${apiKey}`;

  console.log( mapsAPIUrl );  }
}
