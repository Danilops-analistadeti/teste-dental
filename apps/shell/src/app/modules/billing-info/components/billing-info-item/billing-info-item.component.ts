import { Component, Input } from '@angular/core';
import { Client } from '@energy-contracting';
import { EsferaCardColumn } from '@esferaenergia/esfera-ui';
import { esferaCardColumn } from './constants/billing-info-card-column.constant';

@Component({
  selector: 'ec-billing-info-item',
  templateUrl: './billing-info-item.component.html',
  styleUrls: ['./billing-info-item.component.scss']
})
export class BillingInfoItemComponent {
  @Input() client!: Client;

  billingColumns: EsferaCardColumn[] = esferaCardColumn;
}
