import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  @Input() label: string = '';
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
  @Input() rows: string | number = 3;

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
