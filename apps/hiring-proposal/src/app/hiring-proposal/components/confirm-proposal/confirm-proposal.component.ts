import { KeyValuePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  BillingInfo,
  FinancialGuarantee,
  getEnumKeyByEnumValue,
  INDEXER,
  ModulationType,
  Offer,
  Quotation,
  quoteUnavailable
} from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { QuotationProposal } from '../../interfaces/quotation-proposal.interface';
import { QuoteUnavailable } from '../../interfaces/quote-unavailable.inteface';
import { HiringProposalService } from '../../services/hiring-proposal.service';
import { OfferState } from '../../states/offer.state';
import { QuotationProposalState } from '../../states/quotation-proposal.state';
import { PopupCheckoutComponent } from '../popup-checkout/popup-checkout.component';
import { CONFIRM_PROPOSAL_DIALOG } from './constant/confirm-proposal-dialog.constant';

@Component({
  selector: 'ec-confirm-proposal',
  templateUrl: './confirm-proposal.component.html',
  styleUrls: ['./confirm-proposal.component.scss']
})
export class ConfirmProposalComponent implements OnInit {
  offer: Offer;
  quotation: Quotation;
  loading: boolean;
  quotationProposal: QuotationProposal;
  offerName: string;
  modulationType = this.keyValuePipe.transform(ModulationType);

  constructor(
    private store: Store,
    private hiringProposalService: HiringProposalService,
    private notificationsService: NotificationsService,
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmProposalComponent>,
    private matDialog: MatDialog,
    private keyValuePipe: KeyValuePipe
  ) {}

  ngOnInit(): void {
    this.initOffer();
  }

  initQuotationProposal(): void {
    this.quotationProposal = this.store.selectSnapshot(QuotationProposalState);
  }

  initOffer(): void {
    this.offer = this.store.selectSnapshot(OfferState);
  }

  makeProposal(): void {
    this.loading = true;

    this.hiringProposalService
      .createOffer(this.prepareOfferObject())
      .subscribe({
        next: () => this.successMakeProposal(),
        error: ({ error }: HttpErrorResponse) => this.verifyValidOffer(error?.message)
      })
      .add(() => {
        this.dialogRef.close(true);
        this.loading = false;
      });
  }

  successMakeProposal(): void {
    this.store.dispatch(new StateReset(QuotationProposalState));
    this.store.dispatch(new StateReset(OfferState));
    this.matDialog.open(PopupCheckoutComponent, CONFIRM_PROPOSAL_DIALOG);
  }

  verifyValidOffer(msg: string): void {
    if (msg?.includes('Ofertas encerradas para essa cotação.')) {
      this.navigateWithState('/proposal/quote-unavailable', {
        message: quoteUnavailable
      });
    } else {
      this.notificationsService.error(msg);
    }
  }

  prepareOfferObject(): Offer {
    const hiringProposal: Offer = this.store.selectSnapshot(OfferState);
    const newOfferObject = Object.assign({}, hiringProposal);
    newOfferObject.energyVolumeAverage = hiringProposal.energyVolumeAverage?.replace(/[ ,]/g, '.');

    newOfferObject.quotationId = this.quotation.id;

    newOfferObject.financialGuarantee = newOfferObject.financialGuarantee?.map((value: FinancialGuarantee | string) =>
      value instanceof String ? (value as string) : (value as FinancialGuarantee).id
    );

    return newOfferObject;
  }

  navigateWithState(url: string, state: QuoteUnavailable): void {
    this.router.navigateByUrl(url, { state });
  }
}
