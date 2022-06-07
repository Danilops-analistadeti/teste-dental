import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatesControl, Key, QuotationsFilters } from '@energy-contracting';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DATES_CONTROL_DEFAULT } from './constants/dates-control-default.constant';
import { FILTER_OPERATIONS } from './constants/filter-operations.constant';
import { FilterOperations } from './interfaces/filter-operations.interface';

@Component({
  selector: 'ec-quotation-filter-header',
  templateUrl: './quotation-filter-header.component.html',
  styleUrls: ['./quotation-filter-header.component.scss']
})
export class QuotationFilterHeaderComponent implements OnInit {
  @Output() emitFilter: EventEmitter<QuotationsFilters> = new EventEmitter<QuotationsFilters>();

  filterOperations: FilterOperations;
  listFilterOperations = FILTER_OPERATIONS;
  dateControl: DatesControl = DATES_CONTROL_DEFAULT;

  form: FormGroup;
  changeFilter: QuotationsFilters;

  constructor(private formBuilder: FormBuilder, private keyValuePipe: KeyValuePipe) {}

  ngOnInit(): void {
    this.buildForm();
    this.detectChangeFilter();
    this.getAnalyzedList();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      status: new FormControl(null),
      protocol: new FormControl(null),
      owner: new FormControl(null),
      quotationType: new FormControl(null),
      subMarketRegion: new FormControl(null),
      energySource: new FormControl(null),
      priceType: new FormControl(null),
      energyVolumeAverage: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null)
    });
  }

  detectChangeFilter(): void {
    this.form.valueChanges.pipe(distinctUntilChanged(), debounceTime(500)).subscribe(() => {
      this.buildEventEmitter();
    });
  }

  changesMonthPicker(value: Key): void {
    this.form.patchValue({
      [this.dateControl.startDate]: value[this.dateControl.startDate],
      [this.dateControl.endDate]: value[this.dateControl.endDate]
    });
  }

  buildEventEmitter(): void {
    const form = this.form.value;
    this.changeFilter = {};
    const values: KeyValue<string, string>[] = this.keyValuePipe.transform(form);

    values.forEach((element) => {
      if ((element.value && element.value.length) || typeof element.value === 'number') {
        this.changeFilter = {
          ...this.changeFilter,
          [`${element.key}`]: element.value
        };
      }
    });

    this.emitFilter.emit(this.changeFilter);
    this.checkFormValue();
  }

  checkFormValue(): void {
    if (!this.changeFilter) {
      return;
    }
    if (!Object.keys(this.changeFilter).length) {
      delete this.changeFilter;
    }
  }

  getAnalyzedList(): void {
    for (const item of this.listFilterOperations) {
      const itemKeyValue = this.keyValuePipe.transform(item.value);
      this.filterOperations = {
        ...this.filterOperations,
        [item.key]: itemKeyValue
      };
    }
  }

  trackByFn(item: KeyValue<string, string | Record<string, unknown>>): KeyValue<string, unknown> {
    return item;
  }

  resetFilter(): void {
    this.form.reset();
  }

  checkLength(value: string): boolean {
    return !!(value && value.length);
  }
}
