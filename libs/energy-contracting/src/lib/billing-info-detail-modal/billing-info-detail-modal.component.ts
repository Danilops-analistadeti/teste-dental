import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Client, CreateBillingInfo } from '../../public-api';
import { Bank } from '../interfaces/bank.interface';
import { BankService } from '../services/bank.service';
import { BillingInfoService } from '../services/billing-info.service';

@Component({
  selector: 'ec-billing-info-detail-modal',
  templateUrl: './billing-info-detail-modal.component.html',
  styleUrls: ['./billing-info-detail-modal.component.scss']
})
export class BillingInfoDetailModalComponent implements OnInit {
  isLoading!: boolean;
  billingInformation = new FormControl({ value: null, disabled: true });
  clients!: Client[];
  banks!: Bank[];
  billingInfoId!: string | undefined;

  constructor(
    private billingInfoService: BillingInfoService,
    private bankService: BankService,
    public dialogRef: MatDialogRef<BillingInfoDetailModalComponent>,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getBillingInfoById();
  }

  getBillingInfoById(): void {
    this.isLoading = true;
    this.billingInfoService.getBillingInfoById(this.billingInfoId).subscribe({
      next: async (response: CreateBillingInfo) => {
        this.clients = [response.company as Client];
        await this.loadBank(response.bank);
        this.billingInformation.patchValue(response);
        this.isLoading = false;
      },
      error: ({ error }) => {
        this.notificationsService.error(error?.message ?? 'Ops ocorreu algum erro, tente novamente mais tarde!');
        this.dialogRef.close(false);
      }
    });
  }

  async loadBank(compe: string): Promise<void> {
    try {
      this.banks = await this.bankService.getBanks(compe).toPromise();
    } catch ({ error }) {
      this.notificationsService.error(error?.message ?? 'Ops ocorreu algum erro, tente novamente mais tarde!');
      this.isLoading = false;
    }
  }
}
