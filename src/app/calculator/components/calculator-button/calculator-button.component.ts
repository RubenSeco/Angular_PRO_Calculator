import { Component, HostBinding, input, OnInit } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  host: {
    class: "w-1/4 border-r border-b border-indigo-400"
  }
})
export class CalculatorButtonComponent {


  public isCommand = input(false, { transform: (value: boolean | string) => typeof value === "string" ? value === "" : value });

  @HostBinding("class.bg-indigo-700") get commandStyle() {
    return this.isCommand();
  }
}
