import { TestBed } from '@angular/core/testing';

import { WeatherNewsFetchService } from './weather-news-data-fetch.service';

describe('WeatherNewsDataFetchService', () => {
  let service: WeatherNewsFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherNewsFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
