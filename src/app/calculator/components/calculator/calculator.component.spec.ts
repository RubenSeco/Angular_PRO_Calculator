

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';


class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {

  // Declaración global de fixture, compiled y el componente

  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [{
        provide: CalculatorService,
        useClass: MockCalculatorService
      }]
    }).compileComponents();

    // Configuración de fixture, compiled y el componente
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
    // fixture.detectChanges();
  });

  it('should create the app', () => {
    // console.log(compiled);

    expect(component).toBeTruthy();

  });
  it('should have the current getters', () => {

    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');

  });

  it('should display proper calculations values', () => {

    mockCalculatorService.resultText.and.returnValue("123")
    mockCalculatorService.subResultText.and.returnValue("456")
    mockCalculatorService.lastOperator.and.returnValue('*')

    fixture.detectChanges();

    expect(compiled.querySelector('span')!.innerText).toBe("456 *")

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 calculator-button components', () => {

    expect(component.calculatorButton()).toBeTruthy();
    expect(component.calculatorButton().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', () => {

    const butttons = compiled.querySelectorAll('calculator-button');
    expect(butttons.length).toBe(19);
    expect(butttons[0].textContent).toBe('C');
    expect(butttons[1].textContent).toBe('+/-');
    expect(butttons[2].textContent).toBe('%');
    expect(butttons[3].textContent).toBe('÷');

  });

  it('should handle keyboard events correctly', () => {

    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalled()

  });

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue("123")
    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
  });
});










