import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Quotation, QuotationService, QuotationsFilters, QuotationsParams } from '@energy-contracting';
import { BlobExcel, FileService, NotificationsService } from '@esferaenergia/esfera-ui';
import { of, Subscription } from 'rxjs';
import { Sort } from './components/quotation-sort-header/interfaces/sort.interface';
import { quotationsParams } from './constants/quotations-params.constation';
import { QuotationDateTimerPipe } from './pipes/quotation-date-timer.pipe';

@Component({
  selector: 'ec-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class QuotationComponent implements OnInit, OnDestroy {
  quotations!: Quotation[];
  subscription!: Subscription;
  isLoading = true;
  isPulling = false;
  isSkeleton = false;
  params = { ...quotationsParams };
  isFilter!: boolean;
  pulling: any;

  constructor(
    public dialog: MatDialog,
    private quotationService: QuotationService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private quotationDateTimerPipe: QuotationDateTimerPipe,
    private fileService: FileService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.pulling);
  }

  ngOnInit(): void {
    this.getAllQuotations(this.params);
    this.pullQuotations();
  }

  updateQuotations(nextQuotations: Quotation[]): void {
    if (!this.quotations) {
      this.quotations = nextQuotations;
      this.closeLoading();
    } else {
      this.findAndUpdateQuotation(nextQuotations);
    }
  }

  closeLoading(): void {
    this.isLoading = false;
    this.isSkeleton = false;
    this.changeDetectorRef.detectChanges();
  }

  findAndUpdateQuotation(nextQuotations: Quotation[]): void {
    nextQuotations.forEach((item, index: number) => {
      const itemSearch = this.quotations.find((i: Quotation) => i.id === item.id);
      if (!itemSearch) {
        if (this.isPulling) {
          this.quotations.unshift(item);
        } else {
          this.quotations.push(item);
        }
      } else {
        this.replaceItemQuotations(itemSearch, item, index);
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  replaceItemQuotations(itemSearch: Quotation, item: Quotation, index: number): void {
    const isEqual = JSON.stringify(itemSearch) === JSON.stringify(item);
    item.timer = this.quotationDateTimerPipe.transform(item);

    if (!isEqual || item?.timer) {
      this.quotations[index] = item;
      this.refresh();
    }
  }

  removeItemQuotations(index: number): void {
    this.quotations.splice(index, 1);
    this.refresh();
  }

  addFilters(filters: QuotationsFilters): void {
    this.quotations = [];
    this.isLoading = true;
    if (filters) {
      this.params.filters = filters;
    } else {
      delete this.params.filters;
    }
    const filterParams = this.generateNewParams();
    filterParams.page = 1;
    this.getAllQuotations(filterParams);
  }

  addPage(page: number): void {
    if (this.isSkeleton) {
      return;
    }

    this.isSkeleton = true;
    this.changeDetectorRef.detectChanges();
    this.params.page = page;
    this.getAllQuotations(this.params);
  }

  addSort(sort: Sort): void {
    this.quotations = [];
    this.isLoading = true;
    this.params.order = sort.direction ? sort.direction : quotationsParams.order;
    this.params.orderBy = sort.direction ? sort.active : quotationsParams.orderBy;
    const sortParams = this.generateNewParams();
    sortParams.page = 1;
    this.getAllQuotations(sortParams);
  }

  getAllQuotations(params: QuotationsParams): void {
    this.subscription = this.quotationService
      .getAllQuotationsWithParams(params)
      .subscribe({
        next: (response) => this.updateQuotations(response),
        error: (error: HttpErrorResponse) => {
          if (error.status !== 404) {
            this.notificationsService.error('Ops, aconteceu algum problema, tente novamente mais tarde!');
          }
        }
      })
      .add(() => this.closeLoading());
  }

  refreshRequestQuotations(): void {
    this.quotationService.refreshQuotation.subscribe({
      next: () => this.getAllQuotations(this.params)
    });
  }

  refresh(): void {
    this.quotations = this.quotations.slice();
    this.changeDetectorRef.detectChanges();
  }

  showFilter(): void {
    this.isFilter = !this.isFilter;
  }

  pullQuotations(): void {
    this.pulling = setInterval(() => {
      of({})
        .subscribe({
          next: () => this.successPullRequest()
        })
        .add(() => this.closeLoading());
    }, 60000);
  }

  successPullRequest(): void {
    const pullingParams = this.generateNewParams();
    pullingParams.itemsPerPage = this.params.itemsPerPage * this.params.page;
    pullingParams.page = 1;
    this.isPulling = true;
    this.getAllQuotations(pullingParams);
    this.isPulling = false;
    this.params.page = this.params.page++;
  }

  generateNewParams(): QuotationsParams {
    return Object.assign({}, this.params);
  }

  exportQuotations(): void {
    this.quotationService.exportQuotations().subscribe({
      next: (base64) =>
        this.fileService.download(
          this.fileService.base64ToBlob(base64, BlobExcel),
          `Lista de Cotações (${new Date().toLocaleDateString()})`
        ),
      error: ({ error }) => this.notificationsService.error(JSON.parse(error).message)
    });
  }
}
