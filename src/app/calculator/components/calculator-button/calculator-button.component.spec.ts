

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';


@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span className="projected-content underline">Test Content</span>
    </calculator-button>
  `,
})
class TestHostComponent { }


describe('CalculatorButtonComponent', () => {

  // Declaración global de fixture, compiled y el componente

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    // Configuración de fixture, compiled y el componente
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 doubleSize is false', () => {

    const hostCssClasses: string[] = compiled.classList.value.split(" ")
    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalsy();
  });

  it('should apply w-2/4 doubleSize is true', () => {    // Cambiado a true

    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(" ")
    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTruthy();
  });

  it('should emit onClick when handleClick is called', () => {

    // Espías
    spyOn(component.onClick, 'emit');
    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressStyle is called with a matching key', (done) => {

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');


    expect(component.isPressed()).toBe(true);

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done()
    }, 101);

  });

  it('should not set isPressed to true if key is not matching', () => {

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');
    expect(component.isPressed()).toBe(false);

  });

  it('should display projected content', () => {

    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector("span");

    expect(projectedContent).not.toBeNull()

    expect(projectedContent!.innerText).toEqual('Test Content');

  });

});

