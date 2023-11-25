import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const GOOGLE_API_KEY_TOKEN = new InjectionToken<string>('googleAPIKey');

@Injectable({ providedIn: 'root' })
export class GoogleMapsService {
  private isLoaded = false;

  constructor(@Inject(GOOGLE_API_KEY_TOKEN) private googleAPIKey: string, private httpClient: HttpClient) {}

  async loadGoogleMapsAPI(): Promise<boolean> {
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleAPIKey}`;

    return this.httpClient
      .jsonp( mapsAPIUrl, 'callback')
      .toPromise()
      .then( async (x) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log('Google Maps API loaded');
        this.isLoaded = true;
        return true;
      });
  }
}
