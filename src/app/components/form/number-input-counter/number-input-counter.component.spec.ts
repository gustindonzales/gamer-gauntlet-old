import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputCounterComponent } from './number-input-counter.component';

describe('NumberInputCounterComponent', () => {
  let component: NumberInputCounterComponent;
  let fixture: ComponentFixture<NumberInputCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputCounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment value when increment() is called', () => {
    const initialValue = component.value;
    component.increment();
    expect(component.value).toBe(initialValue + component.step);
  });

  it('should not increment value beyond max when increment() is called', () => {
    component.value = component.max;
    component.increment();
    expect(component.value).toBe(component.max);
  });

  it('should decrement value when decrement() is called', () => {
    component.value = 5;
    const initialValue = component.value;
    component.decrement();
    expect(component.value).toBe(initialValue - component.step);
  });

  it('should not decrement value below min when decrement() is called', () => {
    component.value = component.min;
    component.decrement();
    expect(component.value).toBe(component.min);
  });

  it('should update value when onInput() is called with a valid value', () => {
    const newValue = component.min + 1;
    const event = {
      target: { value: newValue.toString() },
    } as unknown as Event;
    component.onInput(event);
    expect(component.value).toBe(newValue);
  });

  it('should update value to min when onInput() is called with a value below min', () => {
    const event = {
      target: { value: (component.min - 1).toString() },
    } as unknown as Event;
    component.onInput(event);
    expect(component.value).toBe(component.min);
  });

  it('should update value to max when onInput() is called with a value above max', () => {
    const event = {
      target: { value: (component.max + 1).toString() },
    } as unknown as Event;
    component.onInput(event);
    expect(component.value).toBe(component.max);
  });

  it('should update value when onBlur() is called with a valid value', () => {
    const newValue = component.min + 1;
    const event = {
      target: { value: newValue.toString() },
    } as unknown as Event;
    component.onBlur(event);
    expect(component.value).toBe(newValue);
  });

  it('should update value to min when onBlur() is called with a value below min', () => {
    const event = {
      target: { value: (component.min - 1).toString() },
    } as unknown as Event;
    component.onBlur(event);
    expect(component.value).toBe(component.min);
  });

  it('should update value to max when onBlur() is called with a value above max', () => {
    const event = {
      target: { value: (component.max + 1).toString() },
    } as unknown as Event;
    component.onBlur(event);
    expect(component.value).toBe(component.max);
  });
});
