import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Quotation, QuotationsParams } from '@energy-contracting';
import { Sort } from '../quotation-sort-header/interfaces/sort.interface';

@Component({
  selector: 'ec-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotationsComponent implements OnChanges, OnInit {
  @ViewChild('content') contentElement: ElementRef;

  @Input() dataSource: Quotation[] = [];
  @Input() params!: QuotationsParams;
  @Input() reloaded!: boolean;
  @Input() filtersOpened!: boolean;
  @Input() isSkeleton!: boolean;

  @Output() pullQuotations = new EventEmitter<number>();
  @Output() sortedChange = new EventEmitter<Sort>();

  data: Quotation[];

  constructor(private changeDetectRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.data = this.dataSource;
    this.changeDetectRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.dataSource?.currentValue) {
      this.refreshDataSource(changes.dataSource.currentValue);
    }
  }

  refreshDataSource(quotations: Quotation[]): void {
    this.dataSource = quotations;
    this.changeDetectRef.detectChanges();
  }

  nextPage(page: number): void {
    this.pullQuotations.emit(page);
  }

  sorted(sort: Sort): void {
    this.sortedChange.emit(sort);
  }
}
