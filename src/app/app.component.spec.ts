import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  // Declaración global de fixture y compiled

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    // Configuración de fixture y compiled
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = new AppComponent();
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render router-outlet wrapped with css classes', () => {

    const divElement = compiled.querySelector("div");

    const cssClasses = "min-w-screen min-h-screen bg-slate-300 flex items-center justify-center px-5 py-5".split(" ");

    expect(divElement).not.toBeNull();

    // divElement?.classList.forEach((className) => {
    //   expect(cssClasses).toContain(className);
    // })

    const divClasses = divElement?.classList.value.split(" ");

    cssClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    })

  });

});
