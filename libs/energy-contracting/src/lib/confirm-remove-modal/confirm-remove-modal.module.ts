import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { ConfirmRemoveModalComponent } from './confirm-remove-modal.component';

const COMPONENTS = [ConfirmRemoveModalComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MatDialogModule, EsferaButtonModule],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyConfirmRemoveModalModule {}
