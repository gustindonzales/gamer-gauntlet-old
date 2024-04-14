import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { FormControl, Validators } from '@angular/forms';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toEqual('');
    expect(component.control).toBeInstanceOf(FormControl);
    expect(component.color).toEqual('primary');
    expect(component.autocomplete).toEqual('off');
    expect(component.disabled).toEqual(false);
    expect(component.required).toEqual(false);
    expect(component.id).toEqual('');
    expect(component.name).toEqual('');
    expect(component.prefix).toEqual('');
    expect(component.options).toEqual([]);
  });

  it('should set a placeholder option when placeholder is set', () => {
    component.placeholder = 'Select an option';
    fixture.detectChanges();
    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.options[0].value).toEqual('');
    expect(selectElement.options[0].text).toEqual(component.placeholder);
  });

  it('should set all the options from the provided options input', () => {
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ];
    fixture.detectChanges();
    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.options.length).toEqual(component.options.length);
    for (let i = 0; i < component.options.length; i++) {
      expect(selectElement.options[i].value).toEqual(
        component.options[i].value,
      );
      expect(selectElement.options[i].text).toEqual(component.options[i].label);
    }
  });

  it('should have hasError property return true when control is invalid and touched', () => {
    component.control.setErrors({ required: 'This field is required' });
    component.control.markAsTouched();
    expect(component.hasError).toEqual(true);
  });

  it('should have isRequired property return true when control has Validators.required', () => {
    component.control.setValidators(Validators.required);
    expect(component.isRequired).toEqual(true);
  });

  it('should have errorMessage return correct error message', () => {
    const errors = [{ required: true }, { custom: 'Custom error message' }];
    const errorMessages = [
      { required: 'This field is required' },
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

  it('should have errorMessage return null when there are no errors', () => {
    expect(component.errorMessage).toBeNull();
  });

  it('should set id to name if id is empty', () => {
    component.name = 'testName';
    component.ngOnInit();
    expect(component.id).toEqual('testName');
  });
});
