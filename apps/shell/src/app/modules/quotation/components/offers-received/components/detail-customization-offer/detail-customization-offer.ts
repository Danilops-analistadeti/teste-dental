import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getCustomizationDescription, getFinancialGuarantee, INDEXER, ModulationType } from '@energy-contracting';
import { DetailCustomizationOffer } from './interfaces/detail-customization-offer.interface';

@Component({
  selector: 'ec-detail-customization-offer',
  templateUrl: './detail-customization-offer.html',
  styleUrls: ['./detail-customization-offer.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailCustomizationOfferComponent {
  isLoading!: boolean;
  indexerEnum = INDEXER;
  modulationEnum = ModulationType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailCustomizationOffer,
    public dialogRef: MatDialogRef<DetailCustomizationOfferComponent>
  ) {}

  get financialGuarantee(): string {
    return getFinancialGuarantee(this.data?.financialGuarantee);
  }

  getOfferCustomizationDescriptionInput(minimum: number, maximum: number): string {
    return getCustomizationDescription(minimum, maximum);
  }
}
