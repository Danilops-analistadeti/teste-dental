import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_MOTH_YEAR_DEFAULT } from './constants/date-moth-year-default';

@Component({
  selector: 'ec-date-month-year',
  templateUrl: './date-month-year.component.html',
  styleUrls: ['./date-month-year.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_MOTH_YEAR_DEFAULT }
  ]
})
export class DateMonthYearComponent implements ControlValueAccessor {
  @Input() appearance = 'outline';
  @Input() label: string;
  @Input() ngStyleFormField: { [key: string]: string };
  @Input() disabled: boolean;
  @Input() min: Date;
  @Input() max: Date;

  value: any;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (date: string | Date): void => {};
  onTouched = (): void => {};

  writeValue(date: Date): void {
    this.value = date;
  }

  registerOnChange(fn: (date: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValueInControl(date: Date | string): void {
    const abstractControl = this.ngControl.control;
    if (abstractControl) {
      abstractControl.setValue(date, { emitModelToViewChange: true });
    }
  }
}
