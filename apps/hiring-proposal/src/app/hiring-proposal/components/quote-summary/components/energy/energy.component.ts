import { Component, Input } from '@angular/core';
import { EnergySource, Quotation, SubMarketRegion } from '@energy-contracting';

@Component({
  selector: 'ec-energy-quote-summary',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss']
})
export class EnergyQuoteSummaryComponent {
  @Input() quotation: Quotation;

  energySource = EnergySource;
  subMarketRegion = SubMarketRegion;
}
