import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HtmlInputType } from '../input/input.component';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIconComponent],
  providers: [provideIcons({ heroCheckCircleSolid })],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent {
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

  @Input() options: string[] = [];
  @Output() isUserInput: EventEmitter<boolean> = new EventEmitter<boolean>();

  isInputFromUser: boolean = true;
  hasFocus: boolean = false;
  focusedElement: HTMLElement | null = null;
  activeOptionIndex = -1;

  get hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  get isRequired(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get showOptions(): boolean {
    return this.options.length > 0 && this.isInputFromUser && this.hasFocus;
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

  onBlur() {
    if (!this.isInputFromUser) {
      this.hasFocus = false;
    }
  }

  onFocus() {
    this.hasFocus = true;
  }

  changeFromUserInput(value: boolean) {
    this.isInputFromUser = value;
    if (value) {
      this.addErrorToControl({
        valueNotFromList: 'Please select a value from the list',
      });
    } else {
      this.removeErrorFromControl();
    }
    this.isUserInput.emit(this.isInputFromUser);
  }

  addErrorToControl(error: ValidationErrors) {
    this.control.setErrors(error);
  }

  removeErrorFromControl() {
    this.control.setErrors(null);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value === '') {
      this.options = [];
    } else {
      this.options = this.options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase()),
      );
    }

    this.changeFromUserInput(true);
  }

  selectOption(option: string) {
    this.control.setValue(option);
    this.changeFromUserInput(false);
  }
}
