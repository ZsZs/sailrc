import { GoogleMapsService } from "./google-maps-service";
import { HttpClient } from "@angular/common/http";
import { MockService } from "ng-mocks";
import { of } from "rxjs";

describe('GoogleMapsService', () => {
  let googleMapsService: GoogleMapsService;
  let mockHttpClient: HttpClient;

  beforeEach( () => {
    mockHttpClient = MockService( HttpClient );
    mockHttpClient.jsonp = jest.fn( () => of({ test: 'test' }));
    googleMapsService = new GoogleMapsService( 'text', mockHttpClient );
  });

  it('should be defined', () => {
    expect(googleMapsService).toBeDefined();
  });

  it( 'loadGoogleMapsAPI() loads Google Maps API and returns true', async () => {
    const result = await googleMapsService.loadGoogleMapsAPI();
    expect(result).toBe(true);
    expect( mockHttpClient.jsonp ).toHaveBeenCalled();
  });
});

