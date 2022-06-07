import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from "ngx-mask";
import { EnergyAddressModule } from '../address/address.module';
import { EnergyLoadingModule } from '../es-loading/es-loading.module';
import { MultiselectModule } from '../multiselect/multiselect.module';
import { CreateBillingInfoComponent } from './create-billing-info.component';

const COMPONENTS = [
  CreateBillingInfoComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MultiselectModule,
    MatChipsModule,
    EsferaButtonModule,
    EnergyLoadingModule,
    MatDialogModule,
    EnergyAddressModule,
    MatAutocompleteModule,
    NgxMaskModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS, EnergyAddressModule, MatChipsModule]
})
export class EnergyCreateBillingInfoModule { }
