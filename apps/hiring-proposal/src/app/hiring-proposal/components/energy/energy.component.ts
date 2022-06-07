import { DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BUSINESS_DAY,
  ConvertDecimalPipe,
  EnergySource,
  FORMAT_DATETIME,
  INDEXER,
  isRetusd,
  ModulationType,
  Offer,
  PaymentDayType,
  PriceType,
  Quotation,
  QuoteUnavailable,
  rejectAlertDialog,
  RoundingMwService,
  ValidLabelOffer,
  validPriceTypeOffer
} from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import * as moment from 'moment';
import { StateReset } from 'ngxs-reset-plugin';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { OfferAction } from '../../actions/hiring-proposal.action';
import { QuotationProposal } from '../../interfaces/quotation-proposal.interface';
import { HiringProposalService } from '../../services/hiring-proposal.service';
import { OfferState } from '../../states/offer.state';
import { QuotationProposalState } from '../../states/quotation-proposal.state';
import { ENERGY_FORM } from './constants/energy-form.constant';
import { OfferType } from './enums/offer-type.enum';
import { ResourcesEnergy } from './interfaces/resource-energy.interface';

@Component({
  selector: 'ec-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss']
})
export class EnergyComponent implements OnInit, AfterViewInit {
  @Input() quotation!: Quotation;
  @Input() quotationProposal!: QuotationProposal;

  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  validValueOffer!: ValidLabelOffer;
  businessDay: number[] = BUSINESS_DAY;
  energyForm: FormGroup;
  isProcessingRejectRequest = false;
  resources: ResourcesEnergy;
  isDisableIndicative!: boolean;
  nextStepper!: number;

  constructor(
    private formBuilder: FormBuilder,
    private convertDecimalPipe: ConvertDecimalPipe,
    private roundingMwService: RoundingMwService,
    private decimalPipe: DecimalPipe,
    private store: Store,
    private datePipe: DatePipe,
    private hiringProposalService: HiringProposalService,
    private notificationsService: NotificationsService,
    private router: Router,
    private keyValuePipe: KeyValuePipe
  ) {
    this.resources = {
      offerType: this.keyValuePipe.transform(OfferType),
      paymentDayType: this.keyValuePipe.transform(PaymentDayType),
      modulationType: this.keyValuePipe.transform(ModulationType),
      indexer: this.keyValuePipe.transform(INDEXER)
    };
  }

  ngAfterViewInit(): void {
    this.onCreateFormChange();
    this.initCustomizationToStateOffer();
    this.parseStateOfferToEnergy();
  }

  ngOnInit(): void {
    this.buildForm();
    this.validValueOffer = validPriceTypeOffer(this.quotation.priceType, this.quotation.quotationType);
  }

  buildForm(): void {
    this.energyForm = this.formBuilder.group({
      ...ENERGY_FORM,
      ...{
        price: new FormControl(this.validValueOffer?.value, Validators.required)
      }
    });
  }

  onCreateFormChange(): void {
    this.energyForm.valueChanges.pipe(distinctUntilChanged(), debounceTime(300)).subscribe({
      next: (offer: Offer) => {
        this.validationDates(offer?.proposalExpiration);
        this.store.dispatch(new OfferAction(offer));
      }
    });
  }

  initCustomizationToStateOffer(): void {
    const offerKeys = Object.keys(OfferType);

    if (!this.quotation.isLongTerm) {
      this.nextStepper = 2;
      this.isDisableIndicative = true;
      this.energyForm.get('offerType').setValue(offerKeys[0], { emitEvent: false });
    } else {
      this.isDisableIndicative = false;
      this.nextStepper = 1;
      this.energyForm.get('offerType').setValue(undefined, { emitEvent: false });
    }

    const offer: Offer = this.store.selectSnapshot(OfferState);
    if (offer?.sourceOffer) {
      this.setOfferState(offer);
    } else {
      this.setQuotationState();
    }
  }

  setOfferState(offer: Offer): void {
    const {
      minimumSeasonality,
      maximumSeasonality,
      minimumFlexibility,
      maximumFlexibility,
      minimalModulation,
      maximumModulation,
      financialGuarantee,
      indexer,
      modulationType
    } = offer;

    this.dispatchOfferToState({
      minimumSeasonality,
      maximumSeasonality,
      minimumFlexibility,
      maximumFlexibility,
      minimalModulation,
      maximumModulation,
      financialGuarantee,
      indexer,
      modulationType
    } as Offer);
  }

  setQuotationState(): void {
    const {
      minimumSeasonality,
      maximumSeasonality,
      minimumFlexibility,
      maximumFlexibility,
      minimalModulation,
      maximumModulation,
      financialGuarantee,
      indexer,
      modulationType
    } = this.quotation;

    this.dispatchOfferToState({
      minimumSeasonality,
      maximumSeasonality,
      minimumFlexibility,
      maximumFlexibility,
      minimalModulation,
      maximumModulation,
      financialGuarantee,
      indexer,
      modulationType
    } as Offer);
  }

  dispatchOfferToState({
    indexer,
    modulationType,
    minimumSeasonality,
    maximumSeasonality,
    minimumFlexibility,
    maximumFlexibility,
    minimalModulation,
    maximumModulation,
    financialGuarantee
  }: Offer): void {
    this.store.dispatch(
      new OfferAction({
        indexer,
        modulationType,
        minimumSeasonality,
        maximumSeasonality,
        minimumFlexibility,
        maximumFlexibility,
        minimalModulation,
        maximumModulation,
        financialGuarantee
      })
    );
  }

  validateRetusd(value: string, retusd: number): void {
    const retusdControl = this.energyForm.get('retusd');

    const checkEditableRetusd = [
      EnergySource.SPECIAL_INCENTIVE_50,
      EnergySource.QUALIFIED_COGENERATION_INCENTIVE_50,
      EnergySource.SPECIAL_INCENTIVE_100,
      EnergySource.QUALIFIED_COGENERATION_INCENTIVE_100];

    if (checkEditableRetusd.indexOf(EnergySource[value]) >= 0) {
      retusdControl.enable({ emitEvent: false });
    } else {
      retusdControl.reset(null, { emitEvent: false });
      retusdControl.disable({ emitEvent: false });
      retusdControl.setValidators([]);
    }

    retusdControl.setValue(retusd || this.quotation.retusd, {
      emitEvent: false
    });

    retusdControl.updateValueAndValidity({ emitEvent: false, onlySelf: true });
  }

  validationDates(proposalExpiration: string | Date): void {
    if (typeof proposalExpiration === 'string') {
      if (proposalExpiration.includes('-')) {
        this.energyForm.get('proposalExpiration').setValue(new Date(proposalExpiration));
      }
    }

    if (proposalExpiration) {
      this.formatInputDatetime('auxProposalExpiration', 'proposalExpiration', this.getPeriod('proposalExpiration'));
    }
  }

  formatInputDatetime(key: string, getKey: string, period: string): void {
    const change = this.energyForm.get(getKey).value.toLocaleString('pt-BR', FORMAT_DATETIME);
    this.energyForm.patchValue({ [key]: `${change} ${period}` }, { emitEvent: false });
  }

  getPeriod(objKey: string): string {
    return Number(moment(this.energyForm.get(objKey).value).format('HH')) > 12 ? 'PM' : 'AM';
  }

  parseStateOfferToEnergy(): void {
    const offer: Offer = this.store.selectSnapshot(OfferState);
    this.energyForm.patchValue(offer, { emitEvent: false });

    this.validateRetusd(this.quotation.energySource, offer?.retusd);
    this.parseEnergyFieldsToForm(offer);
    this.validationDates(offer?.proposalExpiration || this.quotation?.expiration);
  }

  parseEnergyFieldsToForm({ energyVolumeAverage, energyVolumeHour }: Offer): void {
    const convertDecimalVolumeAverage = this.convertDecimalPipe.transform(
      energyVolumeAverage ?? this.quotation.energyVolumeAverage,
      '6',
      true
    ).convertedDecimal;

    const convertDecimalPipeEnergyHour = this.convertDecimalPipe.transform(
      energyVolumeHour ?? this.quotation.energyVolumeHour,
      '6',
      true
    ).convertedDecimal;

    this.energyForm.get('energyVolumeAverage').setValue(convertDecimalVolumeAverage, {
      emitEvent: false,
      onlySelf: false
    });

    this.energyForm.get('energyVolumeHour').setValue(convertDecimalPipeEnergyHour, {
      emitEvent: false,
      onlySelf: false
    });
  }

  validFields(): void {
    this.validValueOffer = validPriceTypeOffer(this.quotation?.priceType, this.quotation.quotationType);

    if (!isRetusd(this.quotation?.energySource)) {
      const retusd = this.energyForm.get('retusd');
      retusd.clearValidators();
      retusd.setErrors([]);
    }
  }

  changeMwAverage(): void {
    const energyVolumeAverageControl = this.energyForm.get('energyVolumeAverage');
    const energyVolumeHourControl = this.energyForm.get('energyVolumeHour');

    if (energyVolumeAverageControl?.value) {
      const convertDecimalPipe = this.convertDecimalPipe.transform(energyVolumeAverageControl.value, '6');

      const startDate = this.datePipe.transform(this.quotation.startDate, 'yyyy/MM/dd');

      const endDate = this.datePipe.transform(this.quotation.endDate, 'yyyy/MM/dd');

      const mwh = this.roundingMwService.roundingMwh(convertDecimalPipe.valueReplaced, startDate, endDate);
      energyVolumeAverageControl.setValue(convertDecimalPipe.convertedDecimal);
      energyVolumeHourControl.setValue(this.decimalPipe.transform(mwh));
    }
  }

  changeMwh(): void {
    const energyVolumeHourControl = this.energyForm.get('energyVolumeHour');
    const energyVolumeAverageControl = this.energyForm.get('energyVolumeAverage');

    if (energyVolumeHourControl?.value) {
      const convertDecimalPipe = this.convertDecimalPipe.transform(energyVolumeHourControl.value, '3');

      const startDate = this.datePipe.transform(this.quotation.startDate, 'yyyy/MM/dd');
      const endDate = this.datePipe.transform(this.quotation.endDate, 'yyyy/MM/dd');

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

  nextStep(): void {
    const priceControl = this.energyForm.get('price');
    if (priceControl.value <= 0 && this.quotation.priceType === PriceType.FIXED) {
      priceControl.reset();
      priceControl.updateValueAndValidity();
    } else if (this.energyForm.valid) {
      this.changedStep.next(this.nextStepper);
    } else {
      this.energyForm.markAllAsTouched();
    }
  }

  rejectOffer(): void {
    this.isProcessingRejectRequest = true;

    this.hiringProposalService
      .refuserOffer(this.quotation?.id)
      .subscribe({
        next: () => this.successRejectOffer(),
        error: () => this.notificationsService.error('Ops, aconteceu algum problema, tente novamente mais tarde!')
      })
      .add(() => (this.isProcessingRejectRequest = false));
  }

  successRejectOffer(): void {
    this.store.dispatch(new StateReset(QuotationProposalState));
    const unavailableQuotation: QuoteUnavailable = {
      message: rejectAlertDialog.text,
      subtitle: rejectAlertDialog.subtitle
    };

    this.navigateWithState('/proposal/quote-unavailable', unavailableQuotation);
  }

  navigateWithState(url: string, state: any): void {
    this.router.navigateByUrl(url, { state });
  }
}
