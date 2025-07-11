import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create error component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the provided error message', () => {
    const testMessage = 'Could not connect to the service.';
    fixture.componentRef.setInput('message', testMessage);

    fixture.detectChanges();

    const errorElement = compiled.querySelector('.error-message');
    expect(errorElement?.textContent).toBe(testMessage);
  });

  it('should display an empty message if the input is an empty string', () => {
    fixture.componentRef.setInput('message', '');

    fixture.detectChanges();

    const errorElement = compiled.querySelector('.error-message');
    expect(errorElement?.textContent).toBe('');
  });
});