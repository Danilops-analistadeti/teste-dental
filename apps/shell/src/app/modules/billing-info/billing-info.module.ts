import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  EnergyBillingInfoDetailModalModule,
  EnergyCreateBillingInfoModule,
  EnergyLoadingModule,
  MultiselectModule
} from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaListTemplateModule
} from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from 'ngx-mask';
import { BillingInfoRoutingModule } from './billing-info-routing.module';
import { BillingInfoDetailComponent } from './components/billing-info-detail/billing-info-detail.component';
import { BillingInfoEditComponent } from './components/billing-info-edit/billing-info-edit.component';
import { BillingInfoItemComponent } from './components/billing-info-item/billing-info-item.component';
import { BillingInfoComponent } from './components/billing-info/billing-info.component';

@NgModule({
  declarations: [BillingInfoComponent, BillingInfoItemComponent, BillingInfoDetailComponent, BillingInfoEditComponent],
  imports: [
    CommonModule,
    MatCardModule,
    BillingInfoRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    EsferaButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    EsferaIconModule,
    MatIconModule,
    EsferaCardItemModule,
    MultiselectModule,
    MatDialogModule,
    MatTooltipModule,
    NgxMaskModule.forChild(),
    EsferaListTemplateModule,
    EnergyLoadingModule,
    EnergyCreateBillingInfoModule,
    EnergyBillingInfoDetailModalModule
  ]
})
export class BillingInfoModule {}
