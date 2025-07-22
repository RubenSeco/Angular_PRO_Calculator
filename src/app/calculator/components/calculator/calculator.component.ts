import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    "(document:keyup)": "handleKeyboardEvent($event)"
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService)

  public calculatorButton = viewChildren(CalculatorButtonComponent)

  public resultText = computed(() => this.calculatorService.resultText())
  public subResultText = computed(() => this.calculatorService.subResultText())
  public lastOperator = computed(() => this.calculatorService.lastOperator())

  // get resultText() {
  //   return this.calculatorService.resultText
  // }

  handleClick = (key: string) => {
    // console.log({ key });
    this.calculatorService.constructNumber(key);

  }

  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalents: Record<string, string> = {
      Escape: "C",
      Clear: "C",
      x: "*",
      "/": "÷",
      Enter: "=",
      ",": ".",
      Backspace: "⌫",
      "+": "+",
      "-": "-",
      "%": "%",
      "=": "="
    }

    const key = event.key;
    const keyValue = keyEquivalents[key] || key;

    this.handleClick(key)

    this.calculatorButton().forEach((button) => {
      button.keyboardPressedStyle(key)
    })
  }
}

