import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ec-quotation-base',
  templateUrl: './quotation-base.component.html',
  styleUrls: ['./quotation-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationBaseComponent {}
