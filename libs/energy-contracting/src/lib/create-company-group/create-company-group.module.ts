import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { EnergyDualListModule } from '../dual-list/dual-list.module';
import { CreateCompanyGroupComponent } from './create-company-group.component';

const COMPONENTS = [
  CreateCompanyGroupComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    EnergyDualListModule,
    FormsModule,
    ReactiveFormsModule,
    EsferaButtonModule,
    MatInputModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyCreateCompanyModule { }
