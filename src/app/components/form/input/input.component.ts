import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export type HtmlInputType =
  | 'text'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'number'
  | 'date';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() inputType: HtmlInputType = 'text';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() color: string = 'primary';
  @Input() autocomplete: string = 'off';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() prefix: string = '';
  @Input() minlength: string | number | null = null;
  @Input() maxlength: string | number | null = null;
  @Input() min: string | number | null = null;
  @Input() max: string | number | null = null;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get errorMessage(): string | null {
    if (this.hasError) {
      if (!this.control.errors) return null;
      switch (true) {
        case this.control.errors['required']:
          return 'This field is required';
        case this.control.errors['email']:
          return 'Please enter a valid email address';
        case this.control.errors['tel']:
          return 'Please enter a valid phone number';
        default:
          // return first error message
          return Object.values(this.control.errors)[0] ?? null;
      }
    }
    return null;
  }

  ngOnInit() {
    if (this.id === '') {
      this.id = this.name;
    }
  }
}
