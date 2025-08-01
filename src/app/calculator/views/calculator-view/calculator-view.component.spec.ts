


import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {

  // Declaración global de fixture y compiled

  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    // Configuración de fixture y compiled
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {

    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    const calculatorComponent = compiled.querySelector('calculator');
    expect(calculatorComponent).toBeTruthy();
  });

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');


    const shouldHave = "w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden".split(' ')

    shouldHave.forEach((className) => {
      expect(divClasses).toContain(className);
    });

  });

  
});
