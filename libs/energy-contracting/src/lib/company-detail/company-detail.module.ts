import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EsferaBoxListModule, EsferaLoadingModule } from '@esferaenergia/esfera-ui';
import { CompanyDetailComponent } from './company-detail.component';

const COMPONENTS = [
  CompanyDetailComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    EsferaBoxListModule,
    EsferaLoadingModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyCompanyDetailModule { }
