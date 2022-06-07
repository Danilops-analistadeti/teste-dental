import { DecimalPipe, KeyValuePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import {
  Client,
  ClientsService,
  ConvertDecimalPipe,
  convertStringToDate,
  CreateQuotation,
  CreateQuotationState,
  CustomModalAlertComponent,
  DefaultDate,
  Energy,
  EnergySource,
  PriceType,
  QuotationData,
  QuotationType,
  RoundingMwService,
  SubMarketRegion,
  SystemDefaultService
} from '@energy-contracting';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { longStepper } from '../utils/long-stepper.util';
import { CUSTOM_ALERT_MWH } from './constants/custom-alert-mwh.constant';
import { INIT_LOADING_CREATE_DEFAULT } from './constants/init-loading-create-default.constant';
import { Resources } from './interfaces/resources.interface';

@Component({
  selector: 'ec-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyComponent implements OnInit, AfterViewInit {
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  createForm!: FormGroup;
  resources!: Resources;
  companyClients: Client[];
  loading = INIT_LOADING_CREATE_DEFAULT;

  constructor(
    private formBuilder: FormBuilder,
    private keyValuePipe: KeyValuePipe,
    private roundingMwService: RoundingMwService,
    private convertDecimalPipe: ConvertDecimalPipe,
    private decimalPipe: DecimalPipe,
    private clientsService: ClientsService,
    private changeDetectorRef: ChangeDetectorRef,
    private systemDefaultService: SystemDefaultService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.resources = {
      energySource: this.keyValuePipe.transform(EnergySource),
      priceType: this.keyValuePipe.transform(PriceType),
      quotationType: this.keyValuePipe.transform(QuotationType),
      subMarketRegion: this.keyValuePipe.transform(SubMarketRegion)
    };
  }

  ngAfterViewInit(): void {
    this.onCreateFormChange();
    this.valueChangesEnergySource();
    this.loadDefaultDates();
  }

  ngOnInit(): void {
    this.buildForm();
    this.preloadAgents();
    this.parseStateQuotationToEnergy();
    this.parseCloneQuotation();
  }

  parseStateQuotationToEnergy(): void {
    const { energy } = this.store.selectSnapshot<CreateQuotation>(CreateQuotationState);

    if (energy) {
      this.createForm.patchValue(energy);
      this.validateRetusd(energy.energySource);
    }
  }

  parseCloneQuotation(): void {
    const quotation: CreateQuotation = window.history.state;
    if (quotation?.energy && quotation?.paymentConditions && quotation?.shippingSettings && quotation?.customization) {
      this.store.dispatch(new QuotationData(quotation));
      this.createForm.patchValue(quotation.energy);
    }
  }

  loadDefaultDates(): void {
    const { isCloned } = this.store.selectSnapshot<CreateQuotation>(CreateQuotationState);
    if (isCloned) {
      return;
    }

    if (!this.createForm.get('startDate').value && !this.createForm.get('endDate').value) {
      this.loading.getDateDefault = true;
      this.systemDefaultService
        .getDefaultDates()
        .subscribe({
          next: (systemDefault: DefaultDate) =>
            this.createForm.patchValue({
              startDate: new Date(systemDefault.startDate),
              endDate: new Date(systemDefault.endDate)
            })
        })
        .add(() => (this.loading.getDateDefault = false));
    }
  }

  valueChangesEnergySource(): void {
    this.createForm.get('energySource').valueChanges.subscribe({
      next: (response: string) => this.validateRetusd(response)
    });
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.createForm.disable();
    } else {
      this.createForm.enable();
    }
  }

  onCreateFormChange(): void {
    this.createForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (create: Energy) => this.store.dispatch(new QuotationData({ energy: create }))
    });
  }

  validateRetusd(value: string): void {
    const retusdControl = this.createForm.get('retusd');
    const fullReparationControl = this.createForm.get('fullReparation');
    fullReparationControl.enable({ emitEvent: false });
    if (value === EnergySource.SPECIAL_INCENTIVE_50 || value === EnergySource.QUALIFIED_COGENERATION_INCENTIVE_50) {
      retusdControl.setValue('35', { emitEvent: false });
      retusdControl.enable({ emitEvent: false });
      fullReparationControl.enable({ emitEvent: false });
    } else if (
      value === EnergySource.SPECIAL_INCENTIVE_100 ||
      value === EnergySource.QUALIFIED_COGENERATION_INCENTIVE_100
    ) {
      retusdControl.setValue('75', { emitEvent: false });
      retusdControl.enable({ emitEvent: false });
      fullReparationControl.enable({ emitEvent: false });
    } else {
      retusdControl.reset(null, { emitEvent: false });
      retusdControl.disable({ emitEvent: false });
      fullReparationControl.disable({ emitEvent: false });
      fullReparationControl.setValue(undefined, { emitEvent: false });
    }

    retusdControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }

  buildForm(): void {
    this.createForm = this.formBuilder.group({
      ownerId: new FormControl('', Validators.required),
      quotationType: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      energyVolumeAverage: new FormControl('', Validators.required),
      energyVolumeHour: new FormControl('', Validators.required),
      energySource: new FormControl('', Validators.required),
      subMarketRegion: new FormControl('', Validators.required),
      retusd: new FormControl('', Validators.required),
      priceType: new FormControl('PLD', Validators.required),
      fullReparation: new FormControl(false)
    });
  }

  preloadAgents(): void {
    this.clientsService
      .getClients()
      .subscribe({
        next: (response) => (this.companyClients = response)
      })
      .add(() => this.changeDetectorRef.detectChanges());
  }

  changeAgents(value: string): void {
    this.loading.isLoadingAgents = true;
    this.clientsService
      .getClients(value)
      .subscribe({
        next: (response) => (this.companyClients = response)
      })
      .add(() => {
        this.loading.isLoadingAgents = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  changeMwAverage(): void {
    const energyVolumeAverageControl = this.createForm.get('energyVolumeAverage');
    const energyVolumeHourControl = this.createForm.get('energyVolumeHour');

    if (energyVolumeAverageControl?.value) {
      const convertDecimalPipe = this.convertDecimalPipe.transform(energyVolumeAverageControl.value, '6');
      const startDate = convertStringToDate(this.createForm.get('startDate').value);
      const endDate = convertStringToDate(this.createForm.get('endDate').value);

      const mwh = this.roundingMwService.roundingMwh(convertDecimalPipe.valueReplaced, startDate, endDate);
      this.validateAlertMwh(convertDecimalPipe.convertedDecimal);
      energyVolumeAverageControl.setValue(convertDecimalPipe.convertedDecimal);
      energyVolumeHourControl.setValue(this.decimalPipe.transform(mwh));
    }
  }

  changeMwh(): void {
    const energyVolumeHourControl = this.createForm.get('energyVolumeHour');
    const energyVolumeAverageControl = this.createForm.get('energyVolumeAverage');

    if (energyVolumeHourControl?.value) {
      const convertDecimalPipe = this.convertDecimalPipe.transform(energyVolumeHourControl.value, '3');
      const startDate = convertStringToDate(this.createForm.get('startDate').value);
      const endDate = convertStringToDate(this.createForm.get('endDate').value);
      const mwAverage: string | number = this.roundingMwService.roundingMwAverage(
        convertDecimalPipe.valueReplaced,
        startDate,
        endDate
      );
      const convertedMwAverage = this.convertDecimalPipe.transform(mwAverage, '6');

      energyVolumeHourControl.setValue(convertDecimalPipe.convertedDecimal);
      energyVolumeAverageControl.setValue(convertedMwAverage.convertedDecimal);
    }
  }

  nextForm(): void {
    if (this.createForm.valid) {
      const newStartDate = convertStringToDate(this.createForm.get('startDate').value);
      const newEndDate = convertStringToDate(this.createForm.get('endDate').value);

      const { isCloned } = this.store.selectSnapshot<CreateQuotation>(CreateQuotationState);
      const skipStepperLong = longStepper(newStartDate, newEndDate) && !isCloned;
      const nextStepper = skipStepperLong ? 2 : 1;

      this.changedStep.next(nextStepper);
    } else {
      this.createForm.markAllAsTouched();
    }
  }

  fullReimbursement(matCheckboxChange: MatCheckboxChange): void {
    const retusdControl = this.createForm.get('retusd');
    const fullReparation = this.createForm.get('fullReparation');

    if (matCheckboxChange.checked) {
      retusdControl.clearValidators();
      retusdControl.setValue('', { emitEvent: false });
      retusdControl.disable({ emitEvent: false });
    } else {
      retusdControl.setValidators(Validators.required);
      retusdControl.enable();
      fullReparation.reset();
    }
  }

  trackByFn(index: number): number {
    return index;
  }

  validateAlertMwh(value: string | number): void {
    const customAlertStorage = localStorage.getItem(CUSTOM_ALERT_MWH.id);
    if (value > 10 && !customAlertStorage) {
      this.dialog.open(CustomModalAlertComponent, {
        width: '350px',
        data: CUSTOM_ALERT_MWH
      });
    }
  }
}
