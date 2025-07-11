import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayForecastComponent } from './day-forecast.component';
import { HourlyForecastComponent } from '../hourly-forecast/hourly-forecast.component';
import { DayForecast } from '@app/features/weather/models/weather.models';
import { By } from '@angular/platform-browser';

describe('DayForecastComponent', () => {
  let component: DayForecastComponent;
  let fixture: ComponentFixture<DayForecastComponent>;
  let compiled: HTMLElement;

  // Create mock data for the required input, including nested hourly data
  const mockDayForecast: DayForecast = {
    date: 'Friday, July 11, 2025',
    hourly: [
      {
        time: '00:00',
        temperature: 15,
        windSpeed: 5,
        description: 'clear sky',
        icon: 'url1',
      },
      {
        time: '03:00',
        temperature: 14,
        windSpeed: 6,
        description: 'few clouds',
        icon: 'url2',
      },
      {
        time: '06:00',
        temperature: 16,
        windSpeed: 7,
        description: 'clouds',
        icon: 'url3',
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayForecastComponent, HourlyForecastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayForecastComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dayForecast', mockDayForecast);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create day forecast component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct date in the header', () => {
    expect(compiled.querySelector('.date-header')?.textContent).toBe(
      'Friday, July 11, 2025'
    );
  });

  it('should render the correct number of hourly-forecast components', () => {
    const hourlyForecasts = fixture.debugElement.queryAll(
      By.directive(HourlyForecastComponent)
    );
    expect(hourlyForecasts.length).toBe(3);
  });

  it('should pass the correct data to the hourly-forecast component', () => {
    const hourlyComponent = fixture.debugElement.query(
      By.directive(HourlyForecastComponent)
    ).componentInstance as HourlyForecastComponent;

    expect(hourlyComponent.forecast()).toEqual(mockDayForecast.hourly[0]);
  });
});
