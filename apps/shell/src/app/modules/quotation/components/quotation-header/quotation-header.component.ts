import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Sort } from '../quotation-sort-header/interfaces/sort.interface';
import { STATUS_TOOLTIP } from './constants/status-tooltip.constant';

@Component({
  selector: 'ec-quotation-header',
  templateUrl: './quotation-header.component.html',
  styleUrls: ['./quotation-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationHeaderComponent {
  @Output() sortedChange = new EventEmitter<Sort>();
  statusTooltip = STATUS_TOOLTIP;
  sort: Sort;

  constructor(private changeDetectRef: ChangeDetectorRef) { }

  sorted(sort: Sort): void {
    this.sort = sort;
    this.sortedChange.emit(sort);
    this.changeDetectRef.detectChanges();
  }
}
