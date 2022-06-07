import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { DatepickerComponent } from './datepicker.component';


describe('DatepickerComponent', () => {
  let component: DatepickerComponent;
  let fixture: ComponentFixture<DatepickerComponent>;
  let datePipe: DatePipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        NgxMaskModule.forRoot()
      ],
      providers: [
        { provide: DatePipe, useValue: { transform: () => '' } },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerComponent);
    (fixture.componentInstance as any).ngControl = { control: new FormControl() };

    datePipe = TestBed.inject(DatePipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set onChange', () => {
    const func = (date: string | Date) => { };
    component.registerOnChange(func);
    expect(component.onChange).toBe(func);
  });

  it('should set onTouched', () => {
    const func = () => { };
    component.registerOnTouched(func);
    expect(component.onTouched).toBe(func);
  });

  it('should set appearance to standard and readonly to true', () => {
    component.setDisabledState(true);
    expect(component.appearance).toBe('standard');
    expect(component.readonly).toBe(true);
  });

  it('should set appearance to fill and readonly to false', () => {
    component.setDisabledState(false);
    expect(component.appearance).toBe('fill');
    expect(component.readonly).toBe(false);
  });

  it('should call writeValue with correct date', () => {
    const dateString = '01/01/2020';
    const date = new Date(dateString).toLocaleString();

    const writeValueSpy = spyOn(component, 'writeValue');
    component.setValue(date);
    expect(writeValueSpy).toHaveBeenCalled();
  });

  it('should set value but date incorrect', () => {
    const writeValueSpy = spyOn(component, 'writeValue').and.stub();
    const isValidDateSpy = spyOn(component, 'isValidDate').and.returnValue(false);

    const dateString = '01/01/2020';

    component.setValue(dateString);

    expect(writeValueSpy).not.toHaveBeenCalled();
    expect(isValidDateSpy).toHaveBeenCalled();
  });

  it('should be write value', () => {
    const convertToDateSpy = spyOn(component, 'convertToDateWithPipe').and.stub();
    const isValidDateSpy = spyOn(component, 'isValidDate').and.returnValue(true);

    const date = new Date();
    component.writeValue(date);
    expect(component.value).toEqual(date);
    expect(convertToDateSpy).toHaveBeenCalled();
    expect(isValidDateSpy).toHaveBeenCalled();
  });

  it('should be write value with value null', () => {
    const convertToDateSpy = spyOn(component, 'convertToDateWithPipe').and.stub();
    const isValidDateSpy = spyOn(component, 'isValidDate').and.returnValue(false);

    component.writeValue(null);

    expect(component.value).toBeUndefined();
    expect(component.ngControl.value).toBeUndefined();
    expect(convertToDateSpy).not.toHaveBeenCalled();
    expect(isValidDateSpy).toHaveBeenCalled();
  });

  it('should return false when date is less than min', () => {
    component.min = new Date('01/02/2020');
    const validDate = component.isValidDate(new Date('01/01/2020').toLocaleDateString());
    expect(validDate).toBeFalsy();
  });

  it('should return false when date is greater than max', () => {
    component.max = new Date('01/02/2020');
    const validDate = component.isValidDate(new Date('03/02/2020').toLocaleDateString());
    expect(validDate).toBeFalsy();
  });

  it('should return false when date does not pass validate function', () => {
    component.matDatepickerFilter = (d: string | Date | null) => false;
    const validDate = component.isValidDate(new Date('01/03/2020'));
    expect(validDate).toBeFalsy();
  });

  it('should return true when date pass all validations', () => {
    const validDate = component.isValidDate(new Date('01/03/2020'));
    expect(validDate).toBeTruthy();
  });

  it('should be convertToDate', () => {
    const newDate = new Date('01/03/2020');
    const toLocaleStringDate = newDate.toLocaleDateString();

    const datePipeSpy = spyOn(datePipe, 'transform').and.returnValue(toLocaleStringDate);

    const converToDate = component.convertToDateWithPipe(newDate);

    expect(converToDate).toEqual(toLocaleStringDate);
    expect(datePipeSpy).toHaveBeenCalledWith(newDate, 'dd/MM/yyyy');
  });

  it('should be is valid date bigger than max', () => {
    const date = new Date('09/04/2020').toLocaleDateString();
    const min = new Date('07/04/2020');
    const max = new Date('08/04/2020');

    component.min = min;
    component.max = max;

    fixture.detectChanges();

    const isValidDate = component.isValidDate(date);

    expect(isValidDate).toBeFalsy();
  });

  it('should be is valid date', () => {
    const date = new Date('04/07/2020');
    const min = new Date('04/07/2020');
    const max = new Date('04/08/2020');

    component.min = min;
    component.max = max;

    fixture.detectChanges();

    const isValidDate = component.isValidDate(date);

    expect(isValidDate).toBeTruthy();
  });
});
