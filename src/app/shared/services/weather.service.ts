import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ForecastApiResponse,
  GeocodingApiResponse,
  GeoCoordinates,
} from '@app/features/weather/models/weather.models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);
  private readonly geoApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
  private readonly forecastApiUrl =
    'https://api.openweathermap.org/data/2.5/forecast';

  /**
   * Fetches data from the Geocoding API and returns the raw response.
   * @param cityName The name of the city to look up.
   * @returns An Observable of the raw API response array.
   */
  getCoordinatesForCity(cityName: string): Observable<GeocodingApiResponse[]> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('limit', 1)
      .set('appid', environment.openWeatherApiKey);

    return this.http.get<GeocodingApiResponse[]>(this.geoApiUrl, { params });
  }

  /**
   * Fetches the raw 5-day forecast data from the API.
   * @param coordinates The latitude and longitude for the forecast.
   * @returns An Observable of the raw API response.
   */
  get5DayForecast({
    lat,
    lon,
  }: GeoCoordinates): Observable<ForecastApiResponse> {
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('units', 'metric')
      .set('appid', environment.openWeatherApiKey);

    return this.http.get<ForecastApiResponse>(this.forecastApiUrl, { params });
  }
}
