import { createAction, props } from '@ngrx/store';
import * as weatherActionTypes from './weather.action-types';
import { DayForecast } from '../models/weather.models';

/**
 * Action dispatched when the user selects a city from the UI
 */
export const citySelected = createAction(
  weatherActionTypes.CITY_SELECTED,
  props<{ cityName: string }>()
);

/**
 * Action dispatched to start the entire weather-fetching process
 */
export const loadCoordinates = createAction(
  weatherActionTypes.LOAD_COORDINATES,
  props<{ cityName: string }>()
);

/**
 * Action dispatched when the entire process succeeds
 */
export const loadForecastSuccess = createAction(
  weatherActionTypes.LOAD_FORECAST_SUCCESS,
  props<{ forecast: DayForecast[] }>()
);

/**
 * Action dispatched dispatched when any part of the process fails
 */
export const loadForecastFailure = createAction(
  weatherActionTypes.LOAD_FORECAST_FAILURE,
  props<{ error: string }>()
);

/**
 * Action dispatched to reset the weather feature state to its initial values
 */
export const weatherReset = createAction(weatherActionTypes.RESET_WEATHER);
