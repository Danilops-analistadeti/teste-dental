import { KeyValuePipe } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BillingInfo,
  BILLING_INFO_MODAL,
  BUSINESS_DAY,
  ClientsService,
  CreateBillingInfoComponent, CreateQuotationState,
  CustomModalAlertComponent,
  INDEXER, PaymentConditions, PaymentDayType,
  QuotationData
} from '@energy-contracting';
import { EsferaCardColumn, EsferaCardItemChanged } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { billingInfoCard } from './constants/billing-info-card-column.constant';
import { CUSTOM_ALERT_PAYMENT_DAY } from './constants/custom-alert-payment-day.constant';
import { INIT_LOADING_PAYMENTS_DEFAULT } from './constants/init-loading-payments-default.constant';
import { Resources } from './interfaces/resources.interface';

@Component({
  selector: 'ec-payment-conditions',
  templateUrl: './payment-conditions.component.html',
  styleUrls: ['./payment-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentConditionsComponent implements OnInit, AfterViewInit {
  clients: BillingInfo[];
  paymentsConditionsForm: FormGroup;
  billingColumns: EsferaCardColumn[] = billingInfoCard;
  minDate = new Date();
  businessDay = BUSINESS_DAY;
  loading = INIT_LOADING_PAYMENTS_DEFAULT;
  isMultiplesPayments: boolean;
  resources!: Resources;

  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef,
    private store: Store,
    private keyValuePipe: KeyValuePipe
  ) {
    this.resources = {
      indexer: this.keyValuePipe.transform(INDEXER)
    };
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.paymentsConditionsForm.disable();
    } else {
      this.paymentsConditionsForm.enable();
    }
  }

  ngAfterViewInit(): void {
    this.onCreateFormChange();
    this.initPaymentConditions();
    this.changePaymentBusinessDay();
    this.changePaymentDayType();
  }

  ngOnInit(): void {
    this.buildForm();
    this.validateMultipleAgents();
    this.parseStateQuotationToPaymentConditions();
  }

  initPaymentConditions(): void {
    this.store.dispatch(
      new QuotationData({
        paymentConditions: this.paymentsConditionsForm.value
      })
    );
  }

  parseStateQuotationToPaymentConditions(): void {
    const { paymentConditions } = this.store.selectSnapshot(CreateQuotationState);

    if (paymentConditions) {
      this.paymentsConditionsForm.patchValue(paymentConditions);
    }
  }

  onCreateFormChange(): void {
    this.paymentsConditionsForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (paymentConditions: PaymentConditions) => this.store.dispatch(new QuotationData({ paymentConditions }))
    });
  }

  buildForm(): void {
    this.paymentsConditionsForm = this.formBuilder.group({
      indexer: new FormControl(INDEXER.NONE),
      billingInfo: new FormControl({
        id: null, name: null, cnpj: null
      }, Validators.required),
      paymentBusinessDay: new FormControl(
        6,
        Validators.compose([Validators.required, Validators.min(1), Validators.max(25)])
      ),
      paymentDayType: new FormControl('WORKING_DAY', Validators.required)
    });
  }

  validateMultipleAgents(): void {
    this.loading.getClients = true;

    const { energy } = this.store.selectSnapshot(CreateQuotationState);
    const billingInfo = this.paymentsConditionsForm.get('billingInfo');

    this.isMultiplesPayments = energy?.ownerId?.length > 1;

    if (!this.isMultiplesPayments) {
      billingInfo.setValidators(Validators.required);
      this.getBillingInfoByCompanyId(energy?.ownerId[0].id);
    } else {
      billingInfo.clearValidators();
    }

    billingInfo.updateValueAndValidity({ emitEvent: false });
  }

  getBillingInfoByCompanyId(id: string): void {
    this.clientsService
      .getBillingInfoByCompanyId(id)
      .subscribe({
        next: (response) => {
          this.clients = response;

          if (response.length === 1) {
            this.paymentsConditionsForm.get('billingInfo').setValue(response[0]);
          } else {
            if (!this.paymentsConditionsForm.get('billingInfo').value) {
              this.paymentsConditionsForm.get('billingInfo').setValue({ id: null, name: null, cnpj: null });
            }
          }
        }
      })
      .add(() => {
        this.loading.getClients = false;
        this.changeDetectionRef.detectChanges();
      });
  }

  openCreateBillingInfo(): void {
    const createOfferDialog = this.dialog.open(CreateBillingInfoComponent, BILLING_INFO_MODAL);

    createOfferDialog.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          const { energy } = this.store.selectSnapshot(CreateQuotationState);
          this.getBillingInfoByCompanyId(energy?.ownerId[0].id);
        }
      }
    });
  }

  selectBillingInfo({ checked, item }: EsferaCardItemChanged): void {
    const controlBillingInfo = this.paymentsConditionsForm.get('billingInfo');
    controlBillingInfo.setValue(checked ? item : null);
  }

  nextForm(): void {
    if (this.paymentsConditionsForm.valid) {
      this.changedStep.next(3);
    } else {
      this.paymentsConditionsForm.markAllAsTouched();
    }
  }

  changePaymentBusinessDay(): void {
    this.paymentsConditionsForm.get('paymentBusinessDay').valueChanges.subscribe({
      next: (value: number) => this.validatePaymentBusinessDay(value)
    });
  }

  changePaymentDayType(): void {
    this.paymentsConditionsForm.get('paymentDayType').valueChanges.subscribe({
      next: (value: PaymentDayType) => this.validatePaymentDayType(value)
    });
  }

  validatePaymentDayType(paymentDayType: PaymentDayType): void {
    if (paymentDayType === Object.keys(PaymentDayType)[1]) {
      this.validatedPaymentDayType();
    } else {
      this.validatePaymentBusinessDay(this.paymentsConditionsForm.get('paymentBusinessDay').value);
    }
  }

  validatedPaymentDayType(): void {
    const customAlertStorage = localStorage.getItem(CUSTOM_ALERT_PAYMENT_DAY.id);

    if (!customAlertStorage && !this.dialog.openDialogs.length) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: CUSTOM_ALERT_PAYMENT_DAY
      });
    }
  }

  validatePaymentBusinessDay(value: number): void {
    const customAlertStorage = localStorage.getItem(CUSTOM_ALERT_PAYMENT_DAY.id);

    if (value !== 6 && !customAlertStorage && value !== 7 && !customAlertStorage) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: CUSTOM_ALERT_PAYMENT_DAY
      });
    }
  }
}
