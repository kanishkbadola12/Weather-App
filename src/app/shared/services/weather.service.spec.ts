import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import {
  GeocodingApiResponse,
  ForecastApiResponse,
} from '@app/features/weather/models/weather.models';
import { HttpErrorResponse } from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  const geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create weather service', () => {
    expect(service).toBeTruthy();
  });

  describe('getCoordinatesForCity', () => {
    it('should call the geocoding API and return the raw response', (done: DoneFn) => {
      const mockCity = 'London';
      const mockApiResponse: GeocodingApiResponse[] = [
        { name: 'London', lat: 51.5, lon: -0.1, country: 'GB' },
      ];

      service.getCoordinatesForCity(mockCity).subscribe((response) => {
        expect(response).toEqual(mockApiResponse);
        done();
      });

      // Expect a request to the geocoding URL and verify its parameters
      const req = httpTestingController.expectOne(
        (r) =>
          r.url === geoApiUrl &&
          r.params.get('q') === mockCity &&
          r.params.get('limit') === '1'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle geocoding API HTTP errors', (done: DoneFn) => {
      const mockCity = 'ErrorCity';
      const mockErrorStatus = 500;
      const mockErrorStatusText = 'Internal Server Error';

      service.getCoordinatesForCity(mockCity).subscribe({
        next: () => fail('should have failed with a 500 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(mockErrorStatus);
          expect(error.statusText).toBe(mockErrorStatusText);
          done();
        },
      });

      const req = httpTestingController.expectOne(
        (r) => r.url === geoApiUrl && r.params.get('q') === mockCity
      );

      req.flush('Server error', {
        status: mockErrorStatus,
        statusText: mockErrorStatusText,
      });
    });
  });

  describe('get5DayForecast', () => {
    it('should call the forecast API and return the raw response', (done: DoneFn) => {
      const mockCoordinates = { lat: 51.5, lon: -0.1 };
      const mockApiResponse: ForecastApiResponse = { list: [] };

      service.get5DayForecast(mockCoordinates).subscribe((response) => {
        expect(response).toEqual(mockApiResponse);
        done();
      });

      // Expect a request to the forecast URL and verify its parameters
      const req = httpTestingController.expectOne(
        (r) =>
          r.url === forecastApiUrl &&
          r.params.get('lat') === '51.5' &&
          r.params.get('lon') === '-0.1'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle forecast API HTTP errors', (done: DoneFn) => {
      const mockCoordinates = { lat: 51.5, lon: -0.1 };

      service.get5DayForecast(mockCoordinates).subscribe({
        next: () => fail('should have failed with a 404 error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(404);
          done();
        },
      });

      const req = httpTestingController.expectOne(
        (r) => r.url === forecastApiUrl
      );

      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
});
