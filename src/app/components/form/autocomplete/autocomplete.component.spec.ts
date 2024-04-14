import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComponent } from './autocomplete.component';
import { FormControl, Validators } from '@angular/forms';

describe('AutoCompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toEqual('');
    expect(component.inputType).toEqual('text');
    expect(component.placeholder).toEqual('');
    expect(component.control).toBeInstanceOf(FormControl);
    expect(component.color).toEqual('primary');
    expect(component.autocomplete).toEqual('off');
    expect(component.disabled).toEqual(false);
    expect(component.readonly).toEqual(false);
    expect(component.required).toEqual(false);
    expect(component.id).toEqual('');
    expect(component.name).toEqual('');
    expect(component.prefix).toEqual('');
    expect(component.minlength).toBeNull();
    expect(component.maxlength).toBeNull();
    expect(component.min).toBeNull();
    expect(component.max).toBeNull();
  });

  it('should have hasError property return true when control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    expect(component.hasError).toEqual(true);
  });

  it('should have isRequired property return true when control has Validators.required', () => {
    component.control.setValidators(Validators.required);
    expect(component.isRequired).toEqual(true);
  });

  it('should have errorMessage return correct error message', () => {
    const errors = [
      { required: true },
      { email: true },
      { tel: true },
      { custom: 'Custom error message' },
    ];
    const errorMessages = [
      { required: 'This field is required' },
      { email: 'Please enter a valid email address' },
      { tel: 'Please enter a valid phone number' },
      { custom: 'Custom error message' },
    ];
    for (let i = 0; i < errors.length; i++) {
      component.control.setErrors(errors[i]);
      component.control.markAsTouched();
      expect(component.hasError).toEqual(true);
      expect(component.errorMessage).toEqual(
        Object.values(errorMessages[i])[0],
      );
    }
  });

  it('should have errorMessage property return null when there are no errors', () => {
    expect(component.errorMessage).toBeNull();
  });

  it('should set id to name if id is empty', () => {
    component.name = 'inputName';
    component.ngOnInit();
    expect(component.id).toEqual('inputName');
  });
});
