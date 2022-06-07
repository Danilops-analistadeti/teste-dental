import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { EnergyLoadingModule } from '../es-loading/es-loading.module';
import { DualListComponent } from './dual-list.component';

const COMPONENTS = [DualListComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    EsferaButtonModule,
    FormsModule,
    ReactiveFormsModule,
    EnergyLoadingModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyDualListModule {}
