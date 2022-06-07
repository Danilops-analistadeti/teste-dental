import { Component, Input } from '@angular/core';

@Component({
  selector: 'ec-quotation-item-skeleton',
  templateUrl: './quotation-item-skeleton.component.html',
  styleUrls: ['./quotation-item-skeleton.component.scss']
})
export class QuotationItemSkeletonComponent {

  @Input() loading!: boolean;

}
