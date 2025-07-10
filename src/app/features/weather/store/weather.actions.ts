import { createAction, props } from '@ngrx/store';
import * as weatherActionTypes from './weather.action-types';
import { DayForecast } from '../models/weather.models';

// Dispatched when the user selects a city from the UI
export const citySelected = createAction(
  weatherActionTypes.CITY_SELECTED,
  props<{ cityName: string }>()
);

// Command to start the entire weather-fetching process
export const loadCoordinates = createAction(
  weatherActionTypes.LOAD_COORDINATES,
  props<{ cityName: string }>()
);

// Dispatched when the entire process succeeds
export const loadForecastSuccess = createAction(
  '[Weather API] Load Forecast Success',
  props<{ forecast: DayForecast[] }>()
);

// Dispatched when any part of the process fails
export const loadForecastFailure = createAction(
  '[Weather API] Load Forecast Failure',
  props<{ error: string }>()
);