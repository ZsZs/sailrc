import { AppInitService } from './app-init.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

describe('AppInitService', () => {
  let appInitService: AppInitService;
  let httpClient: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AppInitService]
    });
    httpClient = TestBed.inject(HttpTestingController);
    appInitService = TestBed.inject(AppInitService);
  });

//  afterEach(() => httpClient.verify());

  it('#init() should return value from a promise',() => {
    expect(appInitService).toBeTruthy();

    appInitService.init().then(value => {
      expect(value).toBe(true );
    });
  });

  it('#init() should return value from a promise',() => {
    const apiKey = environment.googleCloudPlatform.apiKey;
    const mapsAPIUrl =`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

    const dummyData = { id: 1 };

    appInitService.init().then( data => {
      expect(data).toEqual(dummyData);
    });

    // Pass a function to the expectOne method
    const req = httpClient.expectOne(request => request.url === mapsAPIUrl );
    expect(req.request.method).toBe('JSONP');
    req.flush(dummyData);  });
});
