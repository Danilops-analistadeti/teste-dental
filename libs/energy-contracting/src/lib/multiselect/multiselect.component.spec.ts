import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { Quantity } from './enum/quantity.enum';
import { MultiselectComponent } from './multiselect.component';

describe('SelectMultiComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        MultiselectComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatIconModule,
        NgSelectModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    (fixture.componentInstance as any).ngControl = { control: new FormControl() };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call preventDefault', () => {
    const event = { preventDefault: () => { } } as MouseEvent;
    const preventDefaultSpy = spyOn(event, 'preventDefault');
    component.onItemClick(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should set itemsSelectedQuantity with ALL call writevalue with items name', () => {
    const items = [{ name: 'a' }, { name: 'b' }];
    const selectedItemsValue = items.map(({ name }) => name);
    component.itemsSelectedQuantity = Quantity.NONE;
    component.bindValue = 'name';
    component.items = items;
    const writeValuespy = spyOn(component, 'writeValue');

    component.selectAll();
    expect(writeValuespy).toHaveBeenCalledWith(selectedItemsValue);
    expect(component.ngControl.control.value).toEqual(selectedItemsValue);
  });

  it('should set itemsSelectedQuantity with NONE call writevalue with []', () => {
    const items = [{ name: 'a' }, { name: 'b' }];
    component.itemsSelectedQuantity = Quantity.ALL;
    component.bindValue = 'name';
    component.items = items;
    const writeValuespy = spyOn(component, 'writeValue');

    component.selectAll();
    expect(writeValuespy).toHaveBeenCalledWith([]);
    expect(component.ngControl.control.value).toEqual([]);
  });

  it('should set value, call onChange with it and set itemsSelectedQuantity to All', () => {
    const selected = ['a', 'b', 'c'];
    const onChangeSpy = spyOn(component, 'onChange');
    component.items = selected;

    component.writeValue(selected);
    expect(component.value).toEqual(selected);
    expect(component.itemsSelectedQuantity).toBe(Quantity.ALL);
    expect(onChangeSpy).toHaveBeenCalledWith(selected);
  });

  it('should set itemsSelectedQuantity to NONE', () => {
    const selected = [];
    component.writeValue(selected);
    expect(component.itemsSelectedQuantity).toBe(Quantity.NONE);
  });

  it('should set itemsSelectedQuantity to SOME', () => {
    const selected = ['a', 'b'];
    const items = ['c', ...selected];
    component.items = items;

    component.writeValue(selected);
    expect(component.itemsSelectedQuantity).toBe(Quantity.SOME);
  });

  it('should set onChange', () => {
    const func = (selected: any[]) => { };
    component.registerOnChange(func);
    expect(component.onChange).toBe(func);
  });

  it('should set onTouched', () => {
    const func = () => { };
    component.registerOnTouched(func);
    expect(component.onTouched).toBe(func);
  });

  it('should call focused emit', () => {
    const focusEvent = {} as FocusEvent;
    const emitSpy = spyOn(component.focused, 'emit');

    component.onFocus(focusEvent);

    expect(emitSpy).toHaveBeenCalledWith(focusEvent);
  });
});
