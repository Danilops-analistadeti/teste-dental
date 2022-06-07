import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EsferaBoxListModule, EsferaLoadingModule } from '@esferaenergia/esfera-ui';
import { EnergyCompanyDetailModule } from '../company-detail/company-detail.module';
import { EnergyCreateBillingInfoModule } from '../create-billing-info/create-billing-info.module';
import { EnergyLoadingModule } from '../es-loading/es-loading.module';
import { BillingInfoDetailModalComponent } from './billing-info-detail-modal.component';

const COMPONENTS = [BillingInfoDetailModalComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    EsferaBoxListModule,
    EsferaLoadingModule,
    EnergyCompanyDetailModule,
    ReactiveFormsModule,
    EnergyCreateBillingInfoModule,
    EnergyLoadingModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyBillingInfoDetailModalModule {}
