import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(private httpClient: HttpClient) {}

  init(): Promise<boolean | void> {
    const apiKey = environment.googleCloudPlatform.apiKey;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    return this.httpClient
      .jsonp(mapsAPIUrl, 'callback')
      .toPromise()
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      });
  }
}
