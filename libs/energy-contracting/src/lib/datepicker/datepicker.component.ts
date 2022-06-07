import { DatePipe } from '@angular/common';
import { Component, Input, Optional, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MaskApplierService } from 'ngx-mask';
import { isDate } from 'rxjs/internal-compatibility';
import { convertStringToDate } from '../util/date.util';

@Component({
  selector: 'ec-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() readonly = false;
  @Input() label: string;
  @Input() min: Date;
  @Input() max: Date;
  @Input() validation = false;
  @Input() ngStyleFormField: { [key: string]: string };
  @Input() hiddenDatePicker = false;
  @Input() control: any;
  @Input() loading = false;

  @Input() matDatepickerFilter: (d: Date | string | null) => boolean;

  value: Date | string;

  onChange = (date: string | Date): void => {};

  onTouched = (): void => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private datePipe: DatePipe,
    private ngxMask: MaskApplierService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  setValue(date: Date | string) {
    if (isDate(date)) {
      this.setValueInControl(date);
    } else {
      const dateWithMask = this.ngxMask.applyMask(date as any, '00/00/0000');
      this.setValueInControl(dateWithMask);
      this.value = this.convertStringDigitToDate(dateWithMask);
    }
  }

  convertToDateWithPipe(dateString: Date | string): Date | string {
    if (dateString) {
      return this.datePipe.transform(dateString, 'dd/MM/yyyy');
    }

    return dateString;
  }

  convertStringDigitToDate(dateString: Date | string): Date {
    if (typeof dateString === 'string') {
      const dateSplit = dateString
        .split('/')
        .reverse()
        .map((digit) => Number(digit));
      const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
      return date;
    }

    return dateString;
  }

  convertStringToDate(dateString: Date | string): Date {
    if (typeof dateString === 'string') {
      const dateSplit = dateString.split('/').map((digit) => Number(digit));
      const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
      return date;
    }

    return dateString;
  }

  isValidDate(date: Date | string): boolean {
    const dateLocale = this.convertStringDigitToDate(date);
    if (
      (this.min && dateLocale < this.min) ||
      (this.max && dateLocale > this.max) ||
      (this.matDatepickerFilter && !this.matDatepickerFilter(dateLocale))
    ) {
      return;
    }

    return true;
  }

  writeValue(date: Date | string): void {
    let newDate = date;
    if (newDate && typeof date === 'string') {
      const isDateIso = (date as string).includes('-');
      if (isDateIso) {
        newDate = (date as string)?.replace(/[-]/g, '/');
        this.value = this.convertStringToDate(newDate);
      } else {
        newDate = convertStringToDate(newDate);
        if (this.isValidDate(newDate)) {
          this.value = newDate;
        }
      }
    } else {
      this.value = newDate;
    }

    this.setValueInControl(this.convertToDateWithPipe(this.value));
  }

  dateChange(value: Date): void {
    const convertToDateWithPipe = this.convertToDateWithPipe(value);
    this.writeValue(value);
    this.setValueInControl(convertToDateWithPipe);
  }

  setValueInControl(date: Date | string): void {
    const abstractControl = this.ngControl.control;
    if (abstractControl) {
      abstractControl.setValue(date, { emitModelToViewChange: false });
    }
  }

  clearValues(emitModel: boolean): void {
    this.value = null;
    const abstractControl = this.ngControl.control;
    if (abstractControl) {
      abstractControl.reset(null, { emitModelToViewChange: emitModel });
    }
  }

  registerOnChange(fn: (date: Date | string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.readonly = true;
    } else {
      this.readonly = false;
    }
  }
}
