import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { WeatherEffects } from './weather.effects';
import * as WeatherActions from '../store/weather.actions';
import { WeatherService } from '@app/shared/services/weather.service';
import {
  DayForecast,
  ForecastApiResponse,
  GeocodingApiResponse,
} from '../models/weather.models';
import { HttpErrorResponse } from '@angular/common/http';
import { weatherHelpers } from '@app/shared/helpers/weather.helpers';
import { errorHelper } from '@app/shared/helpers/error.helpers';
import { Action } from '@ngrx/store';

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  // Mock data
  const mockCity = 'London';
  const mockGeoResponse: GeocodingApiResponse[] = [
    { name: 'London', lat: 51.5, lon: -0.1, country: 'GB' },
  ];
  const mockForecastResponse: ForecastApiResponse = { list: [] };
  const mockProcessedForecast: DayForecast[] = [
    { date: '2025-07-11', hourly: [] },
  ];

  beforeEach(() => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', [
      'getCoordinatesForCity',
      'get5DayForecast',
    ]);

    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        provideMockStore({}),
        { provide: WeatherService, useValue: mockWeatherService },
      ],
    });

    effects = TestBed.inject(WeatherEffects);

    // Spy on the helper functions
    spyOn(weatherHelpers, 'processForecastData').and.returnValue(
      mockProcessedForecast
    );
    spyOn(errorHelper, 'getFailureReason').and.callFake(
      (err) => err.message || 'An error occurred'
    );
  });

  describe('triggerCoordinateLoad$', () => {
    it('should dispatch loadCoordinates when citySelected is dispatched', (done: DoneFn) => {
      actions$ = of(WeatherActions.citySelected({ cityName: mockCity }));

      effects.triggerCoordinateLoad$.subscribe((resultAction) => {
        expect(resultAction).toEqual(
          WeatherActions.loadCoordinates({ cityName: mockCity })
        );
        done();
      });
    });
  });

  describe('loadWeatherForecast$', () => {
    it('should dispatch loadForecastSuccess on a full successful chain', (done: DoneFn) => {
      actions$ = of(WeatherActions.loadCoordinates({ cityName: mockCity }));

      //Mock methods of weather service
      mockWeatherService.getCoordinatesForCity.and.returnValue(
        of(mockGeoResponse)
      );
      mockWeatherService.get5DayForecast.and.returnValue(
        of(mockForecastResponse)
      );

      effects.loadWeatherForecast$.subscribe((resultAction: Action) => {
        expect(resultAction).toEqual(
          WeatherActions.loadForecastSuccess({
            forecast: mockProcessedForecast,
          })
        );
        expect(mockWeatherService.getCoordinatesForCity).toHaveBeenCalledWith(
          mockCity
        );
        expect(mockWeatherService.get5DayForecast).toHaveBeenCalledWith({
          lat: 51.5,
          lon: -0.1,
        });
        done();
      });
    });

    it('should dispatch loadForecastFailure if coordinates are not found', (done: DoneFn) => {
      actions$ = of(
        WeatherActions.loadCoordinates({ cityName: 'UnknownCity' })
      );

      //Simulate no coordinates found
      mockWeatherService.getCoordinatesForCity.and.returnValue(of([]));

      effects.loadWeatherForecast$.subscribe((resultAction: Action) => {
        expect(resultAction).toEqual(
          WeatherActions.loadForecastFailure({
            error: 'Unable to find location. Coordinates not found for city: UnknownCity',
          })
        );
        expect(mockWeatherService.get5DayForecast).not.toHaveBeenCalled();
        done();
      });
    });

    it('should dispatch loadForecastFailure if get5DayForecast fails', (done: DoneFn) => {
      const error = new HttpErrorResponse({ status: 404 });
      actions$ = of(WeatherActions.loadCoordinates({ cityName: mockCity }));
      
      //Simulate coordinates found
      mockWeatherService.getCoordinatesForCity.and.returnValue(
        of(mockGeoResponse)
      );

      //Simulate 5 day weather forecast
      mockWeatherService.get5DayForecast.and.returnValue(
        throwError(() => error)
      );

      effects.loadWeatherForecast$.subscribe((resultAction: Action) => {
        expect(resultAction.type).toBe(WeatherActions.loadForecastFailure.type);
        expect(errorHelper.getFailureReason).toHaveBeenCalledWith(error);
        done();
      });
    });
  });
});
