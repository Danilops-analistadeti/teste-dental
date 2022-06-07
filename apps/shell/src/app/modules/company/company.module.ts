import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  EnergyCompanyDetailModule,
  EnergyConfirmRemoveModalModule,
  EnergyDualListModule,
  EnergyLoadingModule
} from '@energy-contracting';
import {
  EsferaBoxListModule,
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaListTemplateModule
} from '@esferaenergia/esfera-ui';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    EsferaIconModule,
    ReactiveFormsModule,
    FormsModule,
    EsferaButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    CompanyRoutingModule,
    MatTooltipModule,
    EsferaListTemplateModule,
    EsferaCardItemModule,
    EnergyLoadingModule,
    EnergyConfirmRemoveModalModule,
    EnergyDualListModule,
    EsferaBoxListModule,
    EnergyCompanyDetailModule
  ],
  declarations: [CompanyComponent, EditGroupComponent]
})
export class CompanyModule {}
