import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EsferaIconModule } from '@esferaenergia/esfera-ui';
import { LoadingComponent } from './es-loading.component';

const COMPONENTS = [
  LoadingComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    EsferaIconModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyLoadingModule { }
