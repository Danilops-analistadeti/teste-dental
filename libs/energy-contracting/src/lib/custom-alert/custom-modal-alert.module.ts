import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { CustomModalAlertComponent } from './custom-modal-alert.component';

@NgModule({
  declarations: [CustomModalAlertComponent],
  imports: [CommonModule, MatDialogModule, EsferaButtonModule, MatIconModule, MatCheckboxModule],
  bootstrap: [CustomModalAlertComponent],
  exports: [CustomModalAlertComponent]
})
export class EnergyCustomModalAlertModule {}
