import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create loader component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the city name in the loading text when provided', () => {
    const testCity = 'London';
    fixture.componentRef.setInput('city', testCity);

    fixture.detectChanges();

    const loadingText = compiled.querySelector('.loading-text');
    expect(loadingText?.textContent).toContain(
      `Loading Weather Forecast For ${testCity}`
    );
  });

  it('should display the loading text without a city name when input is null', () => {
    fixture.componentRef.setInput('city', null);

    fixture.detectChanges();

    const loadingText = compiled.querySelector('.loading-text');
    expect(loadingText?.textContent).toBe('Loading Weather Forecast For ');
  });
});
