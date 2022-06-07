import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagComponent } from './components/tag/tag.component';
import { QuotationTypeComponent } from './quotation-type.component';

const COMPONENTS = [
  QuotationTypeComponent,
  TagComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
  ],
  bootstrap: [QuotationTypeComponent],
  exports: [COMPONENTS]
})
export class EnergyQuotationTypeModule { }
