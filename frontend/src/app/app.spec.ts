import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render login action by default', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="login-button"]')).not.toBeNull();
  });

  it('should render a sent message after login', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loginInput = compiled.querySelector('input[name="loginName"]') as HTMLInputElement;
    loginInput.value = 'Demo User';
    loginInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const loginButton = compiled.querySelector('[data-testid="login-button"]') as HTMLButtonElement;
    loginButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    const messageInput = compiled.querySelector('textarea[name="draftMessage"]') as HTMLTextAreaElement;
    messageInput.value = 'First message';
    messageInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const sendButton = compiled.querySelector('[data-testid="send-button"]') as HTMLButtonElement;
    sendButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.textContent).toContain('First message');
  });
});
