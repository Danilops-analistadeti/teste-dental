import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EsferaIconModule, EsferaReplaceModule } from '@esferaenergia/esfera-ui';
import { DetailProposalComponent } from './detail-proposal.component';

const COMPONENTS = [DetailProposalComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, EsferaIconModule, EsferaReplaceModule],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyDetailProposalModule {}
