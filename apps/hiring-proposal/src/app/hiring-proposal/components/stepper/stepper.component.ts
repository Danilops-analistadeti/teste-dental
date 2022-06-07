import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Logout } from '@auth-lib';
import { companyOrSeller, CompanyOrSeller, Quotation, QuotationStatus, QuotationType } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import {
  DISABLED,
  STEPPER_NUMBER_CUSTOMIZATION,
  STEPPER_NUMBER_ENERGY,
  STEPPER_NUMBER_FINANCIAL,
  STEPPER_NUMBER_REGISTRATION
} from '../../constant/stepper.constant';
import { QuotationProposal } from '../../interfaces/quotation-proposal.interface';
import { OfferState } from '../../states/offer.state';
import { QuotationProposalState } from '../../states/quotation-proposal.state';
import { EXPIRED_TIME_ERROR } from './constant/expired-time-error.constant';
import { EXPIRED_TOLERANCE } from './constant/tolerance.constant';
import { Resources } from './interfaces/resources.interface';
import { initStepperControls } from './util/stepper-create.util';

@Component({
  selector: 'ec-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit, OnDestroy {
  @Input() quotation: Quotation;
  @Input() quotationProposal: QuotationProposal;

  selected = new FormControl(0);
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  companyOrSeller: CompanyOrSeller;
  typeOffer: string;
  offerName: string;
  isTolerance: boolean;
  resources: Resources;
  STEPPER_NUMBER_ENERGY: number = STEPPER_NUMBER_ENERGY;
  STEPPER_NUMBER_CUSTOMIZATION: number = STEPPER_NUMBER_CUSTOMIZATION;
  STEPPER_NUMBER_FINANCIAL: number = STEPPER_NUMBER_FINANCIAL;
  STEPPER_NUMBER_REGISTRATION: number = STEPPER_NUMBER_REGISTRATION;
  toleranceTimer: string;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.resources = {
      stepperControls: initStepperControls()
    };
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StateReset(QuotationProposalState, OfferState));
  }

  ngOnInit(): void {
    this.initWhoBuyOrSeller();
    this.initToleranceTimer();
  }

  initToleranceTimer(): void {
    this.toleranceTimer =
      QuotationStatus[this.quotation.status] === QuotationStatus.ANALYSIS
        ? this.quotation.expiration
        : this.quotation.proposalTolerance;
  }

  refreshStepperControls(stepperNumber: number): void {
    for (let index = stepperNumber + 1; index < this.resources.stepperControls.size; index++) {
      this.resources.stepperControls.set(index, DISABLED);
    }
  }

  tolerance(): void {
    this.isTolerance = true;
    const { sourceOffer } = this.store.selectSnapshot(OfferState);
    if (!sourceOffer) {
      this.notificationsService.warning(EXPIRED_TOLERANCE);
    }
  }

  toleranceExpired(): void {
    this.notificationsService.error(EXPIRED_TIME_ERROR);
    this.store.dispatch(new Logout()).subscribe({
      next: () => this.router.navigateByUrl('auth')
    });
  }

  initWhoBuyOrSeller(): void {
    const buyOrSeller: CompanyOrSeller = companyOrSeller(
      this.quotationProposal.offerCompanyName,
      this.quotation.owner,
      this.quotation.quotationType
    );

    this.typeOffer = QuotationType[this.quotation.quotationType] === QuotationType.BUYER ? 'venda' : 'compra';
    this.offerName = QuotationType[this.quotation.quotationType] === QuotationType.BUYER ? buyOrSeller.companySellers : buyOrSeller.companyBuyers;
  }

  changedStep(nextStep: number): void {
    this.selected.setValue(nextStep);
    this.selected.enable();

    if (nextStep === 2) {
      this.selected.disable();
    }

    this.resources.stepperControls.set(nextStep - 1, !DISABLED);
    this.resources.stepperControls.set(nextStep, !DISABLED);
    this.changeDetectorRef.detectChanges();
  }

  setStep(backStep: number): void {
    this.selected.setValue(backStep);
    this.refreshStepperControls(backStep);
  }

  onTabChanged(matTab: MatTabChangeEvent): void {
    this.setStep(matTab.index);
  }
}
