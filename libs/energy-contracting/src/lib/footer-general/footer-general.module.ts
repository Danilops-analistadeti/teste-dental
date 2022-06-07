import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterGeneralComponent } from './footer-general.component';

const COMPONENTS = [
  FooterGeneralComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyFooterGeneralModule { }
