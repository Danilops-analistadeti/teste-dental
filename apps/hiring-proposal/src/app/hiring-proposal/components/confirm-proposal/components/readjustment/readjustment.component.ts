import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getFinancialGuarantee, INDEXER, Offer, Quotation } from '@energy-contracting';
import { CheckDiffValue } from '../types/check-diff-value.type';

@Component({
  selector: 'ec-readjustment',
  templateUrl: './readjustment.component.html',
  styleUrls: ['./readjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadjustmentComponent implements OnInit {
  @Input() offer: Offer;
  @Input() quotation: Quotation;
  modulationType: string;
  financialGuarantee: string;
  diffModulationType: boolean;
  diffMinimumSeasonality: boolean;
  diffMaximumSeasonality: boolean;
  diffMinimumFlexibility: boolean;
  diffMaximumFlexibility: boolean;
  diffMinimalModulation: boolean;
  diffMaximumModulation: boolean;
  indexerEnum = INDEXER;

  ngOnInit(): void {
    this.diffValuesOfferQuotation();
  }

  private diffValuesOfferQuotation() {
    this.diffMinimumSeasonality = this.checkDiffValue(this.offer.minimumSeasonality, this.quotation.minimumSeasonality);
    this.diffMaximumSeasonality = this.checkDiffValue(this.offer.maximumSeasonality, this.quotation.maximumSeasonality);
    this.diffMinimumFlexibility = this.checkDiffValue(this.offer.minimumFlexibility, this.quotation.minimumFlexibility);
    this.diffMaximumFlexibility = this.checkDiffValue(this.offer.maximumFlexibility, this.quotation.maximumFlexibility);
    this.diffMinimalModulation = this.checkDiffValue(this.offer.minimalModulation, this.quotation.minimalModulation);
    this.diffMaximumModulation = this.checkDiffValue(this.offer.maximumModulation, this.quotation.maximumModulation);
    this.financialGuarantee = getFinancialGuarantee(this.offer?.financialGuarantee);
  }

  private checkDiffValue(valueOffer: CheckDiffValue, valueQuotation: CheckDiffValue): boolean {
    return this.convertValueToZero(valueOffer) !== this.convertValueToZero(valueQuotation);
  }

  private convertValueToZero(value: CheckDiffValue): number {
    return value ?? 0;
  }
}
