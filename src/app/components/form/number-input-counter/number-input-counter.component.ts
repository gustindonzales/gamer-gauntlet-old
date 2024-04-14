import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-input-counter',
  standalone: true,
  imports: [],
  templateUrl: './number-input-counter.component.html',
  styleUrl: './number-input-counter.component.scss',
})
export class NumberInputCounterComponent {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() formControlName: string = '';

  increment() {
    if (this.value < this.max) {
      this.value += this.step;
    }
  }

  decrement() {
    if (this.value > this.min) {
      this.value -= this.step;
    }
  }

  onInput(event: Event) {
    // whole numbers only
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    if (value < this.min) {
      this.value = this.min;
    } else if (value > this.max) {
      this.value = this.max;
    } else {
      this.value = value;
    }
  }

  onBlur(event: Event) {
    //whole numbers only
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    if (value < this.min) {
      this.value = this.min;
    } else if (value > this.max) {
      this.value = this.max;
    } else {
      this.value = value;
    }
  }
}
