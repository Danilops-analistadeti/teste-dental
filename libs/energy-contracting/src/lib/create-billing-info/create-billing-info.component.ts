import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthState } from '../../../../auth-lib/src/public-api';
import { Bank } from '../interfaces/bank.interface';
import { ClientBillingInfo } from '../interfaces/client-billing-info.interface';
import { Client } from '../interfaces/client.interface';
import { CompanyAddressData } from '../interfaces/company-billing-data.interface';
import { BankService } from '../services/bank.service';
import { BillingInfoService } from '../services/billing-info.service';
import { ClientsService } from '../services/clients.service';
import { ignoredBillingDataVariables } from './constants/ignored-billing-data-variables.constant';
import { INIT_LOADING_BILLING_DEFAULT } from './constants/init-loading-billing-default.constant';
import { preloadBanksPagination } from './constants/preload-banks-pagination.constant';
import { preloadClientsPagination } from './constants/preload-clients-pagination.constant';
import { CreateBillingInfo } from './interfaces/create-billing-info.interface';

@Component({
  selector: 'ec-create-billing-info',
  templateUrl: './create-billing-info.component.html',
  styleUrls: ['./create-billing-info.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateBillingInfoComponent),
      multi: true
    }
  ]
})
export class CreateBillingInfoComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() clients!: Client[];
  @Input() banks!: Bank[];
  @Input() showActions = true;
  @Input() selectedClients!: Client;
  @Input() emails: string[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  clientSearchControl = new FormControl();
  bankSearchControl = new FormControl();
  billingInformationForm!: FormGroup;
  isLoading = INIT_LOADING_BILLING_DEFAULT;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private formBuilder: FormBuilder,
    private billingInfoService: BillingInfoService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<CreateBillingInfoComponent>,
    private clientsService: ClientsService,
    private bankService: BankService,
    private store: Store
  ) { }

  onChange = (billingInfo: FormGroup): void => { };

  onTouched = (): void => { };

  ngAfterViewInit(): void {
    if (this.selectedClients) {
      this.billingInformationForm.get('company').setValue(this.selectedClients);
    }
  }

  writeValue(value: FormGroup): void {
    if (value) {
      this.billingInformationForm.patchValue(value);
      this.clientSearchControl.setValue(this.billingInformationForm?.value?.company);
      this.bankSearchControl.setValue(this.banks[0] ?? null);
      this.emails = this.billingInformationForm?.value?.emails;

      if (!this.showActions) {
        this.clientSearchControl.disable();
        this.bankSearchControl.disable();
        this.billingInformationForm.get('emails').disable();
      }
    }

    this.onChange(value);
  }

  registerOnChange(fn: (billingInfo: FormGroup) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.billingInformationForm.disable();
    } else {
      this.billingInformationForm.enable();
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.createBillingInfoValueChanges();
    this.preloadClients();
    this.preloadBanks();
    this.fillUserDataOnForm();
    this.listenChangedClientSearch();
    this.listenChangedBankSearch();
  }

  createBillingInfoValueChanges(): void {
    this.billingInformationForm?.valueChanges.subscribe({
      next: () => this.onChange(this.billingInformationForm)
    });
  }

  fillUserDataOnForm(): void {
    if (!this.emails.length && !this.billingInformationForm?.get('emails').value?.lenght) {
      const auth = this.store.selectSnapshot(AuthState);
      if (auth) {
        this.add({ value: auth.email } as MatChipInputEvent);
      }
    }
  }

  buildForm(): void {
    this.billingInformationForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      cnpj: new FormControl(null, Validators.required),
      emails: new FormControl(null, Validators.required),
      bank: new FormControl(null),
      agency: new FormControl(null),
      accountNumber: new FormControl(null),
      phone: new FormControl(''),
      stateRecord: new FormControl(null),
      company: new FormControl(null, Validators.required),
      address: new FormControl(null)
    });
  }

  createBillingInfo(): void {
    this.isLoading.submit = true;
    this.billingInfoService
      .createBillingInfo(this.prepareBillingInfoData())
      .subscribe({
        next: () => {
          this.notificationsService.success('Informações de faturamento cadastrada');
          this.dialogRef.close(true);
        },
        error: ({ error }) => this.notificationsService.error(error?.message)
      })
      .add(() => (this.isLoading.submit = false));
  }

  prepareBillingInfoData(): CreateBillingInfo {
    const billingInfo: CreateBillingInfo = {
      ...this.billingInformationForm?.value
    };
    billingInfo.address = billingInfo.address?.value;

    return billingInfo;
  }

  changeClients(value: string): void {
    if (!value) {
      this.clients = [];
      return;
    }

    this.isLoading.isLoadingClients = true;
    this.clientsService
      .getClients(value)
      .subscribe({
        next: (response) => (this.clients = response)
      })
      .add(() => (this.isLoading.isLoadingClients = false));
  }

  changeBanks(value: string): void {
    this.isLoading.isLoadingBanks = true;
    this.bankService
      .getBanks(value)
      .subscribe({
        next: (response) => (this.banks = response)
      })
      .add(() => (this.isLoading.isLoadingBanks = false));
  }

  add({ input, value }: MatChipInputEvent): void {
    const email = value?.trim();
    const control = new FormControl(email, Validators.email);
    if (control.invalid) {
      this.billingInformationForm.get('emails').setErrors({ email: true });
      return;
    }

    if (email.length && !this.emails.includes(email)) {
      this.emails.push(email);
    }

    if (input) {
      input.value = '';
    }

    this.billingInformationForm.get('emails').setValue(this.emails);
  }

  remove(email: string): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }

    this.billingInformationForm.get('emails').setValue(this.emails);
  }

  get invalidAddress(): boolean {
    const addressControl = this.billingInformationForm.get('address');
    return !addressControl?.value || (addressControl?.value && addressControl.value?.invalid);
  }

  preloadClients(): void {
    this.clientsService.getClients(undefined, preloadClientsPagination).subscribe({
      next: (response) => (this.clients = response)
    });
  }

  preloadBanks(): void {
    this.bankService.getBanks(undefined, preloadBanksPagination).subscribe({
      next: (response) => (this.banks = response)
    });
  }

  displayFnClient(client: Client): string {
    return client?.name ?? '';
  }

  displayFnBank(bank: Bank): string {
    return bank ? `${bank.compe} - ${bank.shortName}` : '';
  }

  onSelectedClient({ option }: MatAutocompleteSelectedEvent): void {
    this.billingInformationForm.get('company').setValue(option.value.id);
    this.billingInformationForm.get('cnpj').setValue(option.value.cnpj);
    this.searchCompanyAddress();
  }

  searchCompanyAddress(): void {
    const cnpj = (this.billingInformationForm.get('cnpj').value)?.replace(/[./-]/g, '') as string;

    if (!cnpj) {
      return;
    }

    this.billingInfoService
      .getCompanyAddressData(cnpj)
      .pipe(map((data) => this.transformCompanyAddressToDataForm(data)))
      .subscribe({
        next: (data) => this.patchCompanyAddressValues(data),
        error: ({ error }) =>
          this.notificationsService.error(error?.message ?? 'Ops, ocorreu um erro. Tente novamente mais tarde!')
      });
  }

  transformCompanyAddressToDataForm(data: CompanyAddressData): ClientBillingInfo {
    return {
      cnpj: data.cnpj,
      name: data.name,
      address: {
        city: data.city,
        complement: data.complement,
        neighborhood: data.neighborhood,
        number: data.number,
        postalCode: data.postalCode,
        street: data.street,
        state: data.stateRecord
      }
    } as ClientBillingInfo;
  }

  patchCompanyAddressValues(data: ClientBillingInfo): void {
    this.clearFormForFillFields();
    this.billingInformationForm.patchValue(data);
  }

  listenChangedClientSearch(): void {
    this.clientSearchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
      next: (data) => {
        if (typeof data === 'string') {
          this.changeClients(data);
        }
      }
    });
  }

  listenChangedBankSearch(): void {
    this.bankSearchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe({
      next: (data) => {
        if (typeof data === 'string') {
          this.changeBanks(data);
        }
      }
    });
  }

  clearFormForFillFields(): void {
    const data = {};
    const formData = this.billingInformationForm.value;
    for (let key of Object.keys(formData).filter((row) => !ignoredBillingDataVariables.includes(row))) {
      data[key] = null;
    }

    this.billingInformationForm.patchValue(data);
  }

  trackByFnClient(client: Client): string {
    return client.id;
  }

  trackByFnEmail(email: string): string {
    return email;
  }

  trackByFnBank(bank: Bank): string {
    return bank.compe;
  }

  onSelectBank({ option }: MatAutocompleteSelectedEvent): void {
    this.billingInformationForm.get('bank').setValue(option.value?.compe);
  }
}
