import { ForecastApiResponse, DayForecast, HourlyForecast } from "../../features/weather/models/weather.models";

/**
 * Formats a Date object into a full weekday and date string.
 * @example "Thursday, July 10, 2025"
 */
function formatDate (date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
};

/**
 * Formats a Date object into a simple time string.
 * @example "03:00 PM"
 */
function formatTime(date: Date): string{
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
};

/**
Takes the raw forecast API response and transforms it into a structured format
@param data The raw ForecastApiResponse.
@returns An array of DayForecast objects, with each object containing the date
*/
function processForecastData (forecastResponse: ForecastApiResponse): DayForecast[] {
  const forecastsByDay: Record<string, HourlyForecast[]> = {};
  const { list } = forecastResponse;
  
  for (const item of list) {
    const forecastDate = new Date(item.dt * 1000);
    const dateKey = formatDate(forecastDate);
    const timeValue = formatTime(forecastDate);
    const description = item.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    
    if (!forecastsByDay[dateKey]) {
      forecastsByDay[dateKey] = [];
    }
    
    forecastsByDay[dateKey].push({
      time: timeValue,
      temperature: Math.round(item.main.temp),
      windSpeed: Math.round(item.wind.speed * 3.6),
      description,
      icon,
    });
  }

  const forecast = Object.keys(forecastsByDay).map(date => ({
    date: date,
    hourly: forecastsByDay[date],
  }));

  return forecast.slice(0, 5);
};

export const weatherHelpers = {
  processForecastData,
  formatDate,
  formatTime
};