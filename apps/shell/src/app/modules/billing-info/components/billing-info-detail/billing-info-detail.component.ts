import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BillingInfo,
  BillingInfoDetailModalComponent,
  BillingInfoService, BILLING_INFO_MODAL,
  ClientsService,
  ConfirmRemoveModalComponent
} from '@energy-contracting';
import { EsferaExpandItem, expandAnimations, NotificationsService } from '@esferaenergia/esfera-ui';
import { Observable } from 'rxjs';
import { BillingInfoEditComponent } from '../billing-info-edit/billing-info-edit.component';
import { displayedColumns } from './constants/displayed-columns-detail.constant';

@Component({
  selector: 'ec-billing-info-detail',
  templateUrl: './billing-info-detail.component.html',
  styleUrls: ['./billing-info-detail.component.scss'],
  animations: [expandAnimations]
})
export class BillingInfoDetailComponent implements OnInit {
  @Input() companyId!: string;
  @Input() set showDetail(show: boolean) {
    this.detailExpand = show ? EsferaExpandItem.EXPANDED : EsferaExpandItem.COLLAPSED;
  }

  detailExpand!: string;
  dataSource$!: Observable<BillingInfo[]>;
  displayedColumns: string[] = displayedColumns;

  constructor(
    private clientsService: ClientsService,
    private billingInfoService: BillingInfoService,
    public dialog: MatDialog,
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.billingInfoGetByIdCompany();
  }

  openEditBillingInfo(billingInfoId: string): void {
    const editBillingInfo = this.dialog.open(BillingInfoEditComponent, BILLING_INFO_MODAL);
    editBillingInfo.componentInstance.billingInfoId = billingInfoId;

    editBillingInfo.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.billingInfoGetByIdCompany();
        }
      }
    });
  }

  billingInfoGetByIdCompany(): void {
    this.dataSource$ = this.clientsService.getBillingInfoByCompanyId(this.companyId);
  }

  openDeleteModal(element: BillingInfo): void {
    const confirmRemoveModalComponent = this.dialog.open(ConfirmRemoveModalComponent, {
      hasBackdrop: true,
      minHeight: '95px',
      height: 'auto'
    });

    confirmRemoveModalComponent.componentInstance.data = element.title;

    confirmRemoveModalComponent.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.deleteBillingInfo(element);
        }
      }
    });
  }

  deleteBillingInfo({ id }: BillingInfo): void {
    this.billingInfoService.deleteBillingInfo(id).subscribe({
      next: () => {
        this.notificationsService.success('Informações de pagamento apagada com sucesso');
        this.billingInfoGetByIdCompany();
      },
      error: ({ error }) => this.notificationsService.error(error)
    });
  }

  openDetailModal(billingInfo: BillingInfo): void {
    const billingInfoDetailModalComponent = this.dialog.open(
      BillingInfoDetailModalComponent,
      BILLING_INFO_MODAL
    );
    billingInfoDetailModalComponent.componentInstance.billingInfoId = billingInfo.id;
  }
}
