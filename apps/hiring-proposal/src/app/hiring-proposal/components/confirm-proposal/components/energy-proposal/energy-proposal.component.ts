import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  ConvertDecimalPipe,
  EnergySource,
  Offer,
  Quotation,
  SubMarketRegion,
  ValidLabelOffer,
  validPriceTypeOffer
} from '@energy-contracting';

@Component({
  selector: 'ec-energy-proposal',
  templateUrl: './energy-proposal.component.html',
  styleUrls: ['./energy-proposal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnergyProposalComponent implements OnInit {
  @Input() quotation: Quotation;
  @Input() offer: Offer;
  diffEnergyVolumeHour: boolean;
  diffEnergyVolumeAverage: boolean;

  energySource = EnergySource;
  subMarketRegion = SubMarketRegion;

  constructor(private convertDecimalPipe: ConvertDecimalPipe, private changeDetectionRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.validateDiffEnergyVolume();
    this.validateDiffEnergyVolumeAverage();
  }

  validateDiffEnergyVolume(): void {
    this.diffEnergyVolumeHour = this.diffValueEnergyVolume(
      this.quotation.energyVolumeHour,
      this.offer.energyVolumeHour,
      3
    );
    this.changeDetectionRef.detectChanges();
  }

  validateDiffEnergyVolumeAverage(): void {
    this.diffEnergyVolumeAverage = this.diffValueEnergyVolume(
      this.quotation.energyVolumeAverage,
      this.offer.energyVolumeAverage,
      6
    );
    this.changeDetectionRef.detectChanges();
  }

  diffValueEnergyVolume(quotationEnergy: string, offerEnergy: string, digits: number): boolean {
    return (
      this.convertDecimalPipe.transform(quotationEnergy, digits, true).convertedDecimal !==
      this.convertDecimalPipe.transform(offerEnergy, digits).convertedDecimal
    );
  }

  get validValueOffer(): ValidLabelOffer {
    return validPriceTypeOffer(this.quotation?.priceType, this.quotation.quotationType);
  }
}
