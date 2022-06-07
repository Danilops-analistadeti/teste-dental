import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TokenDecoded } from '@auth-lib';
import {
  BillingInfo,
  BillingInfoDetailModalComponent, BILLING_INFO_MODAL,
  ClientsService,
  Offer,
  Quotation
} from '@energy-contracting';
import { EsferaCardColumn, EsferaCardItemChanged } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import jwtDecode from 'jwt-decode';
import { distinctUntilChanged } from 'rxjs/operators';
import { OfferAction } from '../../actions/hiring-proposal.action';
import { STEPPER_NUMBER_FINANCIAL } from '../../constant/stepper.constant';
import { OfferState } from '../../states/offer.state';
import { QuotationProposalState } from '../../states/quotation-proposal.state';
import { ConfirmProposalComponent } from '../confirm-proposal/confirm-proposal.component';
import { billingInfoCard } from './constants/billing-info-card-column.constant';
import { CONFIRM_PROPOSAL_MODAL } from './constants/confirm-proposal-modal.constant';
import { INIT_LOADING_DEFAULT_REGISTRATION } from './constants/loading-default-registration.component';

@Component({
  selector: 'ec-registration-data',
  templateUrl: './registration-data.component.html',
  styleUrls: ['./registration-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationDataComponent implements OnInit, AfterViewInit {
  @Input() quotation: Quotation;
  @Input() offerName: string;

  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() backedStep: EventEmitter<number> = new EventEmitter<number>();

  registrationDataForm: FormGroup;
  billingInfo: BillingInfo[];
  billingColumns: EsferaCardColumn[] = billingInfoCard;
  loading = INIT_LOADING_DEFAULT_REGISTRATION;
  isMultipleAgents: boolean;

  constructor(
    private clientsService: ClientsService,
    private store: Store,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.onRegistrationDataForm();
  }

  ngOnInit(): void {
    this.buildForm();
    this.validateIsMultipleAgents();
    this.parseStateRegistrationData();
  }

  onRegistrationDataForm(): void {
    this.registrationDataForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (registrationData) => {
        const partialOffer: Partial<Offer> = {
          observation: registrationData?.observation,
          billingInfo: registrationData?.billingInfo?.id
        };

        this.store.dispatch(new OfferAction(partialOffer));
      }
    });
  }

  parseStateRegistrationData(): void {
    const offer: Offer = this.store.selectSnapshot(OfferState);

    if (offer) {
      this.registrationDataForm.patchValue(offer);
      if (!offer?.observation) {
        this.registrationDataForm.get('observation').setValue(this.quotation.observation);
      }
    }
  }

  getBillingInfoByCompanyId(): void {
    const hiringProposal = this.store.selectSnapshot(QuotationProposalState);

    const { company_id } = jwtDecode(hiringProposal.token) as TokenDecoded;

    this.loading.getBillingInfoByCompanyId = true;
    this.clientsService
      .getBillingInfoByCompanyId(company_id)
      .subscribe({
        next: (response: BillingInfo[]) => this.successGetBillingInfo(response)
      })
      .add(() => {
        this.loading.getBillingInfoByCompanyId = false;
        this.changeDetectionRef.detectChanges();
      });
  }

  successGetBillingInfo(response: BillingInfo[]): void {
    this.billingInfo = response;

    if (response.length === 1) {
      this.registrationDataForm.get('billingInfo').setValue(response[0]);
    }
  }

  validateIsMultipleAgents(): void {
    if (this.quotation.owner.length === 1) {
      this.getBillingInfoByCompanyId();
    } else {
      this.isMultipleAgents = true;
    }
  }

  buildForm(): void {
    this.registrationDataForm = this.formBuilder.group({
      billingInfo: new FormControl('', Validators.required),
      observation: new FormControl('')
    });
  }

  parseStateQuotationToEnergy(): void {
    const offer: Offer = this.store.selectSnapshot(OfferState);

    if (offer) {
      this.registrationDataForm.patchValue(offer);
    }
  }

  selectBillingInfo({ checked, item }: EsferaCardItemChanged): void {
    const billingInfoControl = this.registrationDataForm.get('billingInfo');
    billingInfoControl.setValue(checked ? item : null);

    const offer: Offer = this.store.selectSnapshot(OfferState);
    offer.billingInfo = (billingInfoControl.value)?.id;

    this.store.dispatch(new OfferAction(offer));
  }

  openDetailModal(billingInfo: BillingInfo): void {
    const billingInfoDetailModalComponent = this.dialog.open(
      BillingInfoDetailModalComponent,
      BILLING_INFO_MODAL
    );
    billingInfoDetailModalComponent.componentInstance.billingInfoId = billingInfo.id;
  }

  openConfirmProposal(): void {
    const confirmProposalDialog = this.dialog.open(ConfirmProposalComponent, CONFIRM_PROPOSAL_MODAL);

    const formValue = this.registrationDataForm.value;

    confirmProposalDialog.componentInstance.offerName = this.offerName;
    confirmProposalDialog.componentInstance.quotation = { ...this.quotation, observation: formValue.observation, billingInfo: formValue.billingInfo?.id };
    confirmProposalDialog.componentInstance.offer = this.store.selectSnapshot(OfferState);
  }

  backStep(): void {
    this.backedStep.next(STEPPER_NUMBER_FINANCIAL);
  }
}
