import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterProposalComponent } from './footer-proposal.component';

const COMPONENTS = [
  FooterProposalComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyFooterProposalModule { }
