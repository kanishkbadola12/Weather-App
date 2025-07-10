import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import * as WeatherActions from '../store/weather.actions';
import { WeatherService } from '@app/shared/services/weather.service';
import { DayForecast, ForecastApiResponse, HourlyForecast } from '../models/weather.models';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  /**
   * Listens for `citySelected` and dispatches `loadCoordinates`.
  */
  triggerCoordinateLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.citySelected),
      map((action) =>
        WeatherActions.loadCoordinates({ cityName: action.cityName })
      )
    )
  );

  /**
   * Handles the entire weather data fetching chain.
   * 1. Listens for `loadCoordinates`.
   * 2. Fetches coordinates for the city.
   * 3. On success, uses the coordinates to fetch the 5-day forecast.
   * 4. Processes the raw forecast data into a simple format.
   * 5. Dispatches `loadForecastSuccess` or `loadForecastFailure`.
   */
  loadWeatherForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadCoordinates),
      exhaustMap((action) =>
        this.weatherService.getCoordinatesForCity(action.cityName).pipe(
          switchMap((geoResponse) => {
            const { lat, lon } = geoResponse[0];
            console.log(`Coordinates for ${action.cityName}:`, { lat, lon });
            if (!geoResponse || geoResponse.length === 0) {
              throw new Error(`Coordinates not found for city: ${action.cityName}`);
            }

            return this.weatherService.get5DayForecast({lat, lon}).pipe(
              map((forecastResponse) => {
                const forecast = this.processForecastData(forecastResponse);
                return WeatherActions.loadForecastSuccess({ forecast });
              })
            );
          }),
          catchError((error) =>
            of(WeatherActions.loadForecastFailure({ error: error.message }))
          )
        )
      )
    )
  );

  private processForecastData(data: ForecastApiResponse): DayForecast[] {
    const forecastsByDay: { [date: string]: HourlyForecast[] } = {};

    for (const item of data.list) {
      const [date, time] = item.dt_txt.split(' ');
      if (!forecastsByDay[date]) {
        forecastsByDay[date] = [];
      }
      forecastsByDay[date].push({
        time: time,
        temperature: Math.round(item.main.temp),
        windSpeed: Math.round(item.wind.speed * 3.6),
        description: item.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      });
    }

    const result = Object.keys(forecastsByDay).map(date => ({
      date: date,
      hourly: forecastsByDay[date],
    }));

    return result.slice(0, 5);
  }
}

