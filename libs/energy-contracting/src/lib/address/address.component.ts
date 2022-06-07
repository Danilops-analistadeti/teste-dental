import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Address } from '../interfaces/address.interface';

@Component({
  selector: 'ec-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() disabled = false;

  addressForm!: FormGroup;
  value!: Address;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.addressValueChanges();
  }

  onChange = (address: FormGroup): void => {};

  onTouched = (): void => {};

  buildForm(): void {
    this.addressForm = this.formBuilder.group({
      street: new FormControl(null, Validators.required),
      number: new FormControl(null),
      neighborhood: new FormControl(null, Validators.required),
      complement: new FormControl(),
      city: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required)
    });
  }

  addressValueChanges(): void {
    this.addressForm.valueChanges.subscribe({
      next: () => this.onChange(this.addressForm)
    });
  }

  writeValue(address: FormGroup): void {
    if (address) {
      this.addressForm.patchValue(address, { onlySelf: true, emitEvent: false });
    }

    this.onChange(address);
  }

  registerOnChange(fn: (address: FormGroup) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressForm.disable();
    } else {
      this.addressForm.enable();
    }
  }
}
