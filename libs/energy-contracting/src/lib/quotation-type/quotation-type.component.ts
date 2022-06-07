import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { QuotationType } from '../enums/quotation-type.enum';

@Component({
  selector: 'ec-quotation-type',
  templateUrl: './quotation-type.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationTypeComponent {
  @Input() quotationType: string;

  get colorType(): string {
    return this.getQuotationTypeBuyer() ? 'green' : 'yellow';
  }

  get getNameType(): string {
    return this.getQuotationTypeBuyer() ? 'compra' : 'venda';
  }


  getQuotationTypeBuyer(): boolean {
    return QuotationType[this.quotationType] === QuotationType.BUYER
  }
}
