import { Inject, Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Environment } from "../environments/ienvironment";
import { ENV } from "../environments/environment.provider";

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor( private httpClient: HttpClient, @Inject(ENV) private environment: Environment ) {}

  init(): Promise<boolean | void> {
    const apiKey = this.environment.googleCloudPlatform.apiKey;
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    return this.httpClient
      .jsonp(mapsAPIUrl, 'callback')
      .toPromise()
      .then(async () => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      });
  }
}
