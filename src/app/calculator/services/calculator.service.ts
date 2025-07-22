import { Injectable, signal } from '@angular/core';


const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

const operators = ["+", "-", "*", "/", "÷","x"]

const specialOperators = ["%", "=", "C", "Backspace", ".", "+/-"]

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal("0");
  public subResultText = signal("0");
  public lastOperator = signal("+");


  public constructNumber(value: string): void {

    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log("Invalid Input", value);
      return;
    }


    if (value === "=") {

      this.calculateResult();
      return
      // console.log("Calcular resultado");

    }


    if (value === "C") {
      this.resultText.set("0");
      this.subResultText.set("0");
      this.lastOperator.set("+");
      return;
    }

    // TODO: Revisar cuando tengamos números negativos

    if (value === "Backspace") {
      if (this.resultText() === "0") return;

      // if (this.resultText() === "-0") {
      //   this.resultText.set("0");
      //   return;
      // }

      if (this.resultText().includes("-") && this.resultText().length === 2) {
        this.resultText.set("0");
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set("0");
        return;
      }

      this.resultText.update((v) => v.slice(0, -1))
      return
    }
    // Aplicar operadores

    if (operators.includes(value)) {

      this.calculateResult();
      this.lastOperator.set(value)
      this.subResultText.set(this.resultText());
      this.resultText.set("0");
      return;
    }

    // Limitar número de caracteres
    if (this.resultText().length >= 10) {
      console.log("Max length reached");
      return;
    }

    // Validar punto decimal
    if (value === "." && !this.resultText().includes(".")) {

      if (this.resultText() === "0" || this.resultText() === "") {
        this.resultText.set("0.");
        return;
      }
      this.resultText.update((v) => v + ".");
      return;
    }

    // Manejo del cero inicial
    if (this.resultText() === "0" && value !== ".") {
      if (value === "0") return;
      this.resultText.set(value);
      return;
    }

    // Cambiar de signo
    if (value === "+/-") {
      if (this.resultText() === "0") return;

      if (this.resultText().startsWith("-")) {
        this.resultText.update((v) => v.slice(1));
        return;
      }
      this.resultText.update((v) => "-" + v);
      return;
    }

    // Números
    this.resultText.update((v) => v + value);

  }

  public calculateResult(): void {
    const firstNumber = parseFloat(this.subResultText());
    const secondNumber = parseFloat(this.resultText());
    const operator = this.lastOperator();

    let result = 0;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "x":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      case "÷":
        result = firstNumber / secondNumber;
        break;
      default:
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set("0");
    this.lastOperator.set("+");
  }

}



