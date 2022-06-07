import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  AgentsService,
  ConvertDecimalPipe,
  CreateQuotation,
  EnergySource,
  getCustomizationDescription,
  getFinancialGuarantee,
  INDEXER,
  ModulationType,
  Offer,
  OfferStatus,
  Quotation,
  QuotationService,
  QuotationStatus,
  QuotationType,
  SubMarketRegion
} from '@energy-contracting';
import {
  BlobExcel,
  BlobPdf,
  EsferaExpandItem,
  expandAnimations,
  FileService,
  NotificationsService
} from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { CancelQuotationComponent } from '../cancel-quotation/cancel-quotation.component';
import { ConfirmOfferComponent } from '../confirm-offer/confirm-offer.component';
import { Sort } from '../quotation-sort-header/interfaces/sort.interface';
import { compare } from '../util/compare.util';
import { DetailCustomizationOfferComponent } from './components/detail-customization-offer/detail-customization-offer';
import { baseCancelQuotationDataModal } from './constants/base-cancel-quotation-data-modal.constant';
import { baseDetailCustomizationOfferModal } from './constants/base-detail-customization-offer-modal.constant';
import { offersReceivedColumns } from './constants/offers-received-columns';
import { prepareDateToConfirmOffer } from './utils/prepare-date-confirm-offer.utils';

@Component({
  selector: 'ec-offers-received',
  templateUrl: './offers-received.component.html',
  styleUrls: ['./offers-received.component.scss'],
  animations: [expandAnimations]
})
export class OffersReceivedComponent implements OnInit {
  @Input() quotation: Quotation;
  @Input() isLoading: boolean;
  @Input() hasOfferWinner: boolean;

  @Input() set showDetail(show: boolean) {
    this.detailExpand = show ? EsferaExpandItem.EXPANDED : EsferaExpandItem.COLLAPSED;

    if (show) {
      this.getOffers();
    }
  }

  @Output() selected = new EventEmitter<Quotation>();
  dateTemplate = 'dd/MM/yyyy HH:mm';
  modulationType = ModulationType;
  detailExpand: string;
  tableColumns = offersReceivedColumns;
  offers: Offer[] = [];
  sortedData: Offer[];
  ownerNames: string[];
  indexerEnum = INDEXER;
  offerStatusEnum = OfferStatus;

  constructor(
    private quotationService: QuotationService,
    private dialog: MatDialog,
    private changeDetectRef: ChangeDetectorRef,
    private notificationsService: NotificationsService,
    private fileService: FileService,
    private agentsService: AgentsService,
    private router: Router,
    private store: Store,
    private convertDecimalPipe: ConvertDecimalPipe
  ) { }

  ngOnInit(): void {
    this.getOwnersName();
  }

  getOwnersName(): void {
    this.ownerNames = this.quotation.owner.map((owner) => owner.fantasyName);
  }

  getOffers(): void {
    this.isLoading = true;
    this.quotationService
      .getAllOffersFilteredStatus(this.quotation?.id)
      .subscribe({
        next: (data) => (this.offers = this.sortedData = data)
      })
      .add(() => {
        this.isLoading = false;
        this.changeDetectRef.detectChanges();
      });
  }

  confirmProposal(item: Offer): void {
    const statusEnum = OfferStatus[item.status];

    const isValidOffer =
      statusEnum !== OfferStatus.WINNER && statusEnum !== OfferStatus.EXPIRED && statusEnum !== OfferStatus.REPLACED;
    if (isValidOffer && QuotationStatus[this.quotation.status] === QuotationStatus.ANALYSIS) {
      const confirmDialog = this.dialog.open(ConfirmOfferComponent, {
        data: prepareDateToConfirmOffer(item, this.quotation),
        width: '582px',
        height: '1059px',
        hasBackdrop: true
      });

      confirmDialog.afterClosed().subscribe({
        next: (result: string) => {
          if (result === OfferStatus.WINNER) {
            this.getOffers();
          }
        }
      });
    }
  }

  downloadXlsx(): void {
    this.quotationService.getExcelByQuotationId(this.quotation.id).subscribe({
      next: (response) =>
        this.download(response, BlobExcel, `${this.quotation.protocol}-${new Date().toLocaleDateString()}`),
      error: ({ error }) => this.notificationsService.error(error?.message)
    });
  }

  downloadOfferPDF({ ownerId, fantasyName, registrationForm }: Offer): void {
    if (registrationForm) {
      this.agentsService.getAgentsPdf(ownerId).subscribe({
        next: (response) => this.download(response, BlobPdf, `${fantasyName}-${new Date().toLocaleDateString()}`),
        error: ({ message }: HttpErrorResponse) => this.notificationsService.error(message)
      });
    }
  }

  download(data: string, type: string, name: string): void {
    const blob = this.fileService.base64ToBlob(data, type);
    this.fileService.download(blob, name);
  }

  sortData(sort: Sort): boolean {
    const data = this.offers.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      if (sort.active === 'Preço') {
        return compare(a.price, b.price, isAsc);
      }
    });
  }

  trackByFn(item: Quotation): string {
    return item.id;
  }

  getCustomizationDescriptionInput(minimum: number, maximum: number): string {
    return getCustomizationDescription(minimum, maximum);
  }

  openDetailCustomizationOffer(item: Offer): void {
    this.dialog.open(DetailCustomizationOfferComponent, {
      ...baseDetailCustomizationOfferModal,
      data: prepareDateToConfirmOffer(item, this.quotation)
    });
  }

  createQuotationWithQuotation(): void {
    if (!this.dialog.openDialogs.length) {
      const {
        energySource,
        energyVolumeAverage,
        energyVolumeHour,
        fullReparation,
        owner,
        priceType,
        quotationType,
        retusd,
        subMarketRegion,
        billingInfo,
        indexer,
        paymentBusinessDay,
        paymentDayType,
        companyGroups,
        minimumSeasonality,
        maximumSeasonality,
        minimumFlexibility,
        maximumFlexibility,
        minimalModulation,
        maximumModulation,
        modulationType,
        financialGuarantee
      } = this.quotation;

      const energyVolumeAverageReplaced = this.convertDecimalPipe.transform(energyVolumeAverage, '6', true)
        ?.convertedDecimal;

      const energyVolumeHourReplaced = this.convertDecimalPipe.transform(energyVolumeHour, '3', true)?.convertedDecimal;

      const quotation: CreateQuotation = {
        energy: {
          energySource: EnergySource[energySource],
          energyVolumeAverage: energyVolumeAverageReplaced,
          energyVolumeHour: energyVolumeHourReplaced,
          fullReparation,
          ownerId: owner,
          priceType,
          quotationType: QuotationType[quotationType],
          retusd,
          subMarketRegion: SubMarketRegion[subMarketRegion]
        },
        paymentConditions: {
          billingInfo,
          indexer: INDEXER[indexer],
          paymentBusinessDay,
          paymentDayType
        },
        shippingSettings: {
          companyGroups
        },
        customization: {
          minimumSeasonality,
          maximumSeasonality,
          minimumFlexibility,
          maximumFlexibility,
          minimalModulation,
          maximumModulation,
          modulationType: modulationType,
          financialGuarantee
        }
      };

      this.router.navigateByUrl('/quotation/create-quotation', { state: { ...quotation, isCloned: true } });
    }
  }

  cancelQuotation(): void {
    this.dialog.open(CancelQuotationComponent, {
      ...baseCancelQuotationDataModal,
      data: {
        id: this.quotation.id
      }
    });
  }

  get financialGuarantee(): string {
    return getFinancialGuarantee(this.quotation?.financialGuarantee);
  }
}
