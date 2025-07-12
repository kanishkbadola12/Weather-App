import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create when required inputs are provided', () => {
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should throw an error if the required "title" input is not provided', () => {
    expect(() => fixture.detectChanges()).toThrow();
  });

  it('should display the title correctly', () => {
    const testTitle = 'Good Afternoon';
    fixture.componentRef.setInput('title', testTitle);
    fixture.detectChanges();

    const titleEl = compiled.querySelector('.message-title');
    expect(titleEl?.textContent).toBe(testTitle);
  });

  describe('Variant and styling', () => {
    it('should apply the info class by default', () => {
      fixture.componentRef.setInput('title', 'Info Title');
      fixture.detectChanges();

      const container = compiled.querySelector('.message-container');
      expect(container?.classList.contains('info')).toBeTrue();
      expect(container?.classList.contains('error')).toBeFalse();
    });

    it('should apply the error class when variant is set to "error"', () => {
      fixture.componentRef.setInput('title', 'Error Title');
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      const container = compiled.querySelector('.message-container');
      expect(container?.classList.contains('error')).toBeTrue();
      expect(container?.classList.contains('info')).toBeFalse();
    });
  });

  describe('Conditional content', () => {
    it('should not display an icon if iconUrl is not provided', () => {
      fixture.componentRef.setInput('title', 'No Icon');
      fixture.detectChanges();

      const iconEl = compiled.querySelector('.message-icon');
      expect(iconEl).toBeNull();
    });

    it('should display an icon if iconUrl is provided', () => {
      const iconUrl = 'assets/icons/test-icon.svg';
      fixture.componentRef.setInput('title', 'With Icon');
      fixture.componentRef.setInput('iconUrl', iconUrl);
      fixture.detectChanges();

      const iconEl = compiled.querySelector('.message-icon') as HTMLImageElement;
      expect(iconEl).not.toBeNull();
      expect(iconEl.src).toContain(iconUrl);
    });

    it('should not display message or prompt if they are not provided', () => {
      fixture.componentRef.setInput('title', 'Title Only');
      fixture.detectChanges();

      expect(compiled.querySelector('.message-subtitle')).toBeNull();
      expect(compiled.querySelector('.message-prompt')).toBeNull();
    });

    it('should display the message and prompt when they are provided', () => {
      const testMessage = 'This is a test message.';
      const testPrompt = 'This is a test prompt.';
      fixture.componentRef.setInput('title', 'Full Message');
      fixture.componentRef.setInput('message', testMessage);
      fixture.componentRef.setInput('prompt', testPrompt);
      fixture.detectChanges();

      const messageEl = compiled.querySelector('.message-subtitle');
      const promptEl = compiled.querySelector('.message-prompt');

      expect(messageEl?.textContent).toBe(testMessage);
      expect(promptEl?.textContent).toBe(testPrompt);
    });
  });
});