import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EnergyDetailProposalModule } from '../detail-proposal/detail-proposal.module';
import { EnergyLoadingModule } from '../es-loading/es-loading.module';
import { EnergyFooterProposalModule } from '../footer-proposal/footer-proposal.module';
import { EnergyConvertDecimalModule } from '../pipes/convert-decimal/convert-decimal.module';
import { EnergyTransformMwhModule } from '../pipes/transform-mwh/transform-mwh.module';
import { ConfirmProposalComponent } from './confirm-proposal.component';

const COMPONENTS = [ConfirmProposalComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    EnergyLoadingModule,
    MatIconModule,
    EnergyFooterProposalModule,
    EnergyDetailProposalModule,
    EnergyConvertDecimalModule,
    EnergyTransformMwhModule,
    EnergyConvertDecimalModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyConfirmProposal {}
