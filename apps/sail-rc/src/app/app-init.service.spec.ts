import { AppInitService } from './app-init.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ENV } from "../environments/environment.provider";

describe('AppInitService', () => {
  let appInitService: AppInitService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppInitService,
        {provide: ENV, useValue: {googleCloudPlatform: {apiKey: 'test-api'}}},
      ],
    });
    httpClient = TestBed.inject(HttpTestingController);
    appInitService = TestBed.inject(AppInitService);
  });

  //  afterEach(() => httpClient.verify());

  it('AppInitService should be defined', () => {
    expect(appInitService).toBeTruthy();
  });

  it('#init() should return value from a promise', () => {
    const mapsAPIUrl = `https://maps.googleapis.com/maps/api/js?key=test-api`;

    const dummyData = { id: 1 };

    appInitService.init().then((data) => {
      console.log(data);
      expect(data).toEqual(dummyData);
    });

    // Pass a function to the expectOne method
    const req = httpClient.expectOne((request) => request.url === mapsAPIUrl);
    expect(req.request.method).toBe('JSONP');
    req.flush(dummyData);
  });
});
