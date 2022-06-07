import { Component, Input } from '@angular/core';
import { EnergySource, SubMarketRegion } from '@energy-contracting';
import { Quotation } from '../interfaces/quotation.inteface';

@Component({
  selector: 'ec-detail-proposal',
  templateUrl: './detail-proposal.component.html',
  styleUrls: ['./detail-proposal.component.scss']
})
export class DetailProposalComponent {
  @Input() offerQuotation!: Quotation;
  subMarketRegionEnum = SubMarketRegion;
  energySourceEnum = EnergySource;
}
