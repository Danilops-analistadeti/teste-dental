import { AfterViewInit, Component, EventEmitter, Input, Optional, Output, Self, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Quantity } from './enum/quantity.enum';

@Component({
  selector: 'ec-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
})
export class MultiselectComponent implements ControlValueAccessor, AfterViewInit {
  @Output() focused: EventEmitter<FocusEvent> = new EventEmitter();
  @Output() searched: EventEmitter<string> = new EventEmitter();
  @ViewChild('ngSelect') ngSelect: any;
  @Input() appendTo!: string;
  @Input() items: any;
  @Input() bindLabel: string;
  @Input() bindValue: string;
  @Input() groupBy: string;
  @Input() placeholder: string;
  @Input() selectableGroup = false;
  @Input() selectAllLabel: string;
  @Input() selectedAllLabel: string;
  @Input() valueTemplate: TemplateRef<HTMLElement>;
  @Input() optionTemplate: TemplateRef<HTMLElement>;
  @Input() optionGroupTemplate: TemplateRef<HTMLElement>;
  @Input() footerTemplate: TemplateRef<HTMLElement>;
  @Input() loading = false;
  @Input() notFoundText: string;
  @Input() multiple = true;
  @Input() disabled: boolean;
  @Input() initFocus = false;
  @Input() closeOnSelect = true;
  @Input() showAllSelect = true;
  @Input() tabindex: string;

  textModelChanged: Subject<string> = new Subject<string>();
  textModelChangeubscription: Subscription;

  onChange = (selected: any[]): void => { };
  onTouched = (): void => { };

  value = [];
  itemsSelectedQuantity: Quantity = Quantity.NONE;
  quantity = Quantity;

  constructor(
    @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) { this.ngControl.valueAccessor = this; }
  }

  ngAfterViewInit(): void {
    if (this.initFocus) {
      this.ngSelect?.focus();
    }

    this.textModelSubscription();
  }

  textModelSubscription(): void {
    this.textModelChangeubscription = this.textModelChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: (response) => this.searched.emit(response)
    });
  }

  onItemClick(event: MouseEvent): void {
    event.preventDefault();
  }

  onFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  onSearch(event: any): void {
    if (event?.term) {
      this.textModelChanged.next(event.term);
    } else {
      this.searched.emit('');
    }
  }

  selectAll(): void {
    let selectedItems = [];

    if (this.itemsSelectedQuantity === Quantity.NONE) {
      this.itemsSelectedQuantity = Quantity.ALL;
      selectedItems = this.items.filter(item => !item.disabled).map(
        filteredItem => this.bindValue ? filteredItem[this.bindValue] : filteredItem
      );
    } else {
      this.itemsSelectedQuantity = Quantity.NONE;
    }

    this.ngControl.control.setValue(selectedItems);
    this.writeValue(selectedItems);
  }

  writeValue(selected: any): void {
    this.value = selected;

    if (this.value?.length === 0) {
      this.itemsSelectedQuantity = Quantity.NONE;
    } else if (this.items && this.value?.length === this.items?.filter(item => !item.disabled)?.length) {
      this.itemsSelectedQuantity = Quantity.ALL;
    } else {
      this.itemsSelectedQuantity = Quantity.SOME;
    }

    this.onChange(this.value);
  }

  registerOnChange(fn: (selected: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
