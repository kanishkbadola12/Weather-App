/**
 * Intial state for the weather feature in the application.
 */
export interface WeatherState {
  selectedCityName: string | null;
  forecast: DayForecast[] | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Represents geographic coordinates.
 */
export interface GeoCoordinates {
  lat: number;
  lon: number;
}

/**
 * Represents a single 3-hour forecast entry for the UI.
 */
export interface HourlyForecast {
  time: string;
  temperature: number;
  windSpeed: number;
  description: string;
  icon: string;
}

/**
 * Represents a full day, containing the date and its 3-hourly forecasts.
 */
export interface DayForecast {
  date: string;
  hourly: HourlyForecast[];
}

/**
 * Represents the structure of location object returned by the
 * OpenWeatherMap Geocoding API.
 */
export interface GeocodingApiResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

/**
 * Represents 3-hour forecast entry within the main API response list.
 */
export interface ApiForecastItem {
  dt: number; // Unix timestamp
  main: { temp: number };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

/**
 * Represents the top-level structure of the entire 5-day forecast API response.
 */
export interface ForecastApiResponse {
  list: ApiForecastItem[];
}
