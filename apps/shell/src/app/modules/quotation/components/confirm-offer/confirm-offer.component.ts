import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ConfirmProposal, getCustomizationDescription,
  getFinancialGuarantee,
  INDEXER,
  ModulationType,
  OfferService,
  OfferStatus,
  QuotationService
} from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { ObservationModal } from './interfaces/observation-modal.interface';
import { ObservationComponent } from './observation/observation.component';

@Component({
  selector: 'ec-confirm-offer',
  templateUrl: './confirm-offer.component.html',
  styleUrls: ['./confirm-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmOfferComponent {
  isLoading!: boolean;
  indexerEnum = INDEXER;
  offerStatusEnum = OfferStatus;
  modulationEnum = ModulationType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmProposal,
    private quotationService: QuotationService,
    private offersService: OfferService,
    private notifications: NotificationsService,
    public dialogRef: MatDialogRef<ConfirmOfferComponent>,
    private dialog: MatDialog
  ) { }

  changeFeedback(): void {
    this.isLoading = true;
    const { id, sendEmailWithPrice } = this.data?.offerQuotation;

    this.quotationService
      .putQuotation(id, sendEmailWithPrice)
      .subscribe({
        next: () => this.notifications.success('Sucesso em alterar feedback'),
        error: () => this.notifications.error('Ops, aconteceu algum problema, tente novamente mais tarde!')
      })
      .add(() => (this.isLoading = false));
  }

  changeStatus(index: number, revisionObservation?: string): void {
    this.isLoading = true;

    const offerKeys = Object.keys(OfferStatus);
    const status = offerKeys[index];
    this.offersService
      .setStatusOffer({ id: this.data?.offerId, status, revisionObservation })
      .subscribe({
        next: () => {
          const values = Object.values(OfferStatus);
          this.notifications.success(`Sucesso em definir ${values[index]}`);
          this.dialogRef.close(status);
        },
        error: () => this.notifications.error('Ops, aconteceu algum problema, tente novamente mais tarde!')
      })
      .add(() => (this.isLoading = false));
  }

  get financialGuarantee(): string {
    return getFinancialGuarantee(this.data?.financialGuarantee);
  }

  getOfferCustomizationDescriptionInput(minimum: number, maximum: number): string {
    return getCustomizationDescription(minimum, maximum);
  }

  openObservationModal(): void {
    const confirmDialog = this.dialog.open(ObservationComponent, {
      width: '500px'
    });

    confirmDialog.afterClosed().subscribe({
      next: (responseModal: ObservationModal) => {
        if (responseModal.close) {
          this.changeStatus(1, responseModal.observation);
        }
      }
    });
  }
}
