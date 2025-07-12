import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HourlyForecastComponent } from './hourly-forecast.component';
import { HourlyForecast } from '@app/features/weather/models/weather.models';

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;
  let compiled: HTMLElement;

  function getTextContent(selector: string): string {
    return compiled.querySelector(selector)?.textContent?.trim() ?? '';
  }

  // Create mock data for the required input
  const mockForecast: HourlyForecast = {
    time: '15:00',
    temperature: 21,
    windSpeed: 12,
    description: 'scattered clouds',
    icon: 'icon-url.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyForecastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('hourlyForecast', mockForecast);

    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create hourly foreacast component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the time correctly', () => {
    expect(getTextContent('.time')).toBe('15:00');
  });

  it('should display the temperature correctly', () => {
    expect(getTextContent('.temperature')).toBe('21°C');
  });

  it('should display the description correctly', () => {
    expect(getTextContent('.description')).toBe('scattered clouds');
  });

  it('should display the wind speed correctly', () => {
    expect(getTextContent('.wind-value')).toBe('12 km/h');
  });

  it('should set the image src and alt attributes correctly', () => {
    const imgElement = compiled.querySelector(
      '.weather-icon'
    ) as HTMLImageElement;

    expect(imgElement.src).toContain('icon-url.png');
    expect(imgElement.alt).toBe('scattered clouds');
  });
});
