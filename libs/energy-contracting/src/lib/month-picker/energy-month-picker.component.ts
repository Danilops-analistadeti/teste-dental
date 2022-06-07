import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReplacePipe } from '@esferaenergia/esfera-ui';
import { getDateStringNoTime } from '../util/date.util';
import { Key } from './types/key.type';

@Component({
  selector: 'ec-month-picker',
  templateUrl: './energy-month-picker.component.html',
  styleUrls: ['./energy-month-picker.component.scss'],
  providers: [ReplacePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyMonthPickerComponent {
  @Output() changeValue = new EventEmitter<Key>();

  @Input() minMonth: Date;
  @Input() maxMonth: Date;
  @Input() startMonth: string;
  @Input() endMonth: string;
  @Input() label = 'Período';
  @Input() appearance: 'outline' | 'fill' = 'fill';

  showMonthPicker = false;
  firstYear = new Date().getFullYear();
  finalYear = new Date().getFullYear();

  monthPickerForm: FormGroup;
  @Input()
  set form(value: FormGroup) {
    if (value?.get(this.startMonth)?.value) {
      this.auxStartMonth = new Date(value?.get(this.startMonth).value);
    }
    if (value?.get(this.endMonth)?.value) {
      this.auxEndMonth = new Date(value?.get(this.endMonth).value);
    }
    this.monthPickerForm = value;
  }

  auxStartMonth: Date;
  auxEndMonth: Date;

  constructor(private datePipe: DatePipe) {}

  close(): void {
    this.showMonthPicker = false;
  }

  getMonths(): Key[] {
    const months = [];
    for (let x = 1; x < 13; x++) {
      const month = new Date(`${x}/01/01 00:01`).toDateString();
      months.push({ key: this.datePipe.transform(month, 'MMM'), value: x });
    }
    return months;
  }

  moveYear(direction: 'down' | 'up', firstyear: boolean): void {
    if (firstyear) {
      if (direction === 'up') {
        this.firstYear++;
      } else {
        --this.firstYear;
      }
    } else {
      if (direction === 'up') {
        this.finalYear++;
      } else {
        --this.finalYear;
      }
    }
  }

  selectMonth(event: string, firstyear: boolean): void {
    if (firstyear) {
      this.auxStartMonth = new Date(`${event}/01/${this.firstYear} 00:00`);
    } else {
      this.auxEndMonth = this.getLastDayMonth(Number(event), this.finalYear);
    }
  }

  getLastDayMonth(month: number, year: number): Date {
    const lastDay = new Date(year, month, 0);
    lastDay.setHours(23, 59, 59);
    return lastDay;
  }

  isFirstYear(): boolean {
    if (this.auxStartMonth) {
      const selectYear = this.auxStartMonth.getFullYear();
      if (this.firstYear === selectYear) {
        return true;
      }
    }
    return false;
  }

  isFinalYear(): boolean {
    if (this.auxEndMonth) {
      const selectYear = this.auxEndMonth.getFullYear();
      if (this.finalYear === selectYear) {
        return true;
      }
    }
    return false;
  }

  isFirtSelectDate(month: number): boolean {
    if (this.auxStartMonth) {
      const selectMonth = this.auxStartMonth.getMonth() + 1;
      if (month === selectMonth && this.firstYear === this.auxStartMonth.getFullYear()) {
        return true;
      }
    }
    return false;
  }

  isFinalSelectDate(month: number): boolean {
    if (this.auxEndMonth) {
      const selectMonth = this.auxEndMonth.getMonth() + 1;
      if (month === selectMonth && this.finalYear === this.auxEndMonth.getFullYear()) {
        return true;
      }
    }
    return false;
  }

  confirmSelect(): void {
    this.changeValue.emit({
      [this.startMonth]: getDateStringNoTime(this.auxStartMonth),
      [this.endMonth]: getDateStringNoTime(this.auxEndMonth)
    });
    this.showMonthPicker = false;
  }

  cleanCalendar(): void {
    this.auxStartMonth = null;
    this.auxEndMonth = null;
  }

  cleanForm(): void {
    this.changeValue.emit({
      [this.startMonth]: null,
      [this.endMonth]: null
    });

    this.cleanCalendar();
  }

  isDisabledFirstCalendar(month: number): boolean {
    const data = new Date(`${month}/15/${this.firstYear} 00:00`);
    const checkDate = Number(`${this.firstYear}${month < 10 ? '0' + month : month}`);
    if (this.minMonth) {
      let m: any = this.minMonth.getMonth() + 1;
      m < 10 ? (m = `0${m}`) : (m = m);
      const auxMin = Number(`${this.minMonth.getFullYear()}${m}`);
      if (checkDate < auxMin) {
        return true;
      }
    }
    return this.auxEndMonth && data > this.auxEndMonth;
  }

  isDisabledFinalCalendar(month: number): boolean {
    const data = new Date(`${month}/15/${this.finalYear} 00:00`);
    const checkDate = Number(`${this.firstYear}${month < 10 ? '0' + month : month}`);
    if (this.maxMonth) {
      let m: any = this.maxMonth.getMonth() + 1;
      m < 10 ? (m = `0${m}`) : (m = m);
      const auxMin = Number(`${this.maxMonth.getFullYear()}${m}`);
      if (checkDate > auxMin) {
        return true;
      }
    }
    return this.auxStartMonth && data < this.auxStartMonth;
  }

  isRangeFirstCalendar(month: number): boolean {
    if (this.auxStartMonth && this.auxEndMonth) {
      const data = new Date(`${month}/15/${this.firstYear} 00:00`);
      if (data >= this.auxStartMonth && data <= this.auxEndMonth) {
        return true;
      }
    }
    return false;
  }

  isRangeFinalCalendar(month: number): boolean {
    if (this.auxStartMonth && this.auxEndMonth) {
      const data = new Date(`${month}/15/${this.finalYear} 00:00`);
      if (data >= this.auxStartMonth && data <= this.auxEndMonth) {
        return true;
      }
    }
    return false;
  }

  touchMonthPicker(): void {
    this.showMonthPicker = true;
    const startMonthControl = this.monthPickerForm.get(this.startMonth);
    startMonthControl.markAsTouched();
    startMonthControl.updateValueAndValidity();
  }
}
