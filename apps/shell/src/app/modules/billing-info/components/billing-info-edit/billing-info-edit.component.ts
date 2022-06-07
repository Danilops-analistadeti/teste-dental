import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Bank, BankService, BillingInfoService, Client, CreateBillingInfo } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { LOADING_BILLING_INFO_EDIT } from './constants/loading-billing-info-edit.constant';

@Component({
  selector: 'ec-billing-info-edit',
  templateUrl: './billing-info-edit.component.html',
  styleUrls: ['./billing-info-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingInfoEditComponent implements AfterViewInit {
  billingInformation = new FormControl({ value: null, disabled: false });
  isLoading = LOADING_BILLING_INFO_EDIT;
  billingInfoId!: string;
  banks!: Bank[];
  clients!: Client[];

  constructor(
    private billingInfoService: BillingInfoService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<BillingInfoEditComponent>,
    private bankService: BankService,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getBillingInfoById();
  }

  getBillingInfoById(): void {
    this.isLoading.getBillingInfoById = true;
    this.billingInfoService.getBillingInfoById(this.billingInfoId).subscribe({
      next: async (response: CreateBillingInfo) => await this.successGetBillingInfo(response),
      error: ({ error }) => {
        this.isLoading.getBillingInfoById = false;
        this.notificationsService.error(error?.message ?? 'Ops ocorreu algum erro, tente novamente mais tarde!');
        this.dialogRef.close(false);
        this.cd.detectChanges();
      }
    });
  }

  async successGetBillingInfo(billingInfo: CreateBillingInfo): Promise<void> {
    await this.loadBank(billingInfo.bank);
    this.clients = [billingInfo.company as Client];
    this.billingInformation.patchValue(billingInfo);
    this.isLoading.getBillingInfoById = false;
    this.cd.detectChanges();
  }

  async loadBank(compe: string): Promise<void> {
    try {
      this.banks = await this.bankService.getBanks(compe).toPromise();
    } catch ({ error }) {
      this.isLoading.getBillingInfoById = false;
      this.notificationsService.error(error?.message ?? 'Ops ocorreu algum erro, tente novamente mais tarde!');
      this.cd.detectChanges();
    }
  }

  editBillingInfo(): void {
    this.isLoading.submit = true;
    this.billingInfoService
      .editBillingInfo(this.prepareBillingInfoData(), this.billingInfoId)
      .subscribe({
        next: () => {
          this.notificationsService.success('Informações de faturamento cadastrada!');
          this.dialogRef.close(true);
          this.cd.detectChanges();
        },
        error: ({ error }) => this.notificationsService.error(error?.message)
      })
      .add(() => {
        this.isLoading.submit = false;
        this.cd.detectChanges();
      });
  }

  prepareBillingInfoData(): CreateBillingInfo {
    let billingInfo = this.billingInformation?.value;
    if (billingInfo?.value) {
      billingInfo = billingInfo.value;
    }

    billingInfo.company = billingInfo.company?.id ?? billingInfo.company;
    billingInfo.address = billingInfo.address?.value;
    return billingInfo;
  }

  get isInvalid(): boolean {
    return this.billingInformation?.invalid || this.billingInformation.value?.invalid;
  }
}
