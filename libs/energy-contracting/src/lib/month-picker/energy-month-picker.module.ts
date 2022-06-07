import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EsferaButtonModule, EsferaIconModule, EsferaReplaceModule, ReplacePipe } from '@esferaenergia/esfera-ui';
import { EnergyClickOutSideModule } from '../directives/click-out-side/click-out-side.module';
import { EnergyMonthPickerComponent } from './energy-month-picker.component';

const COMPONENTS = [
  EnergyMonthPickerComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    EsferaIconModule,
    EsferaReplaceModule,
    EsferaButtonModule,
    EnergyClickOutSideModule
  ],
  providers: [ReplacePipe],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyMonthPickerModule { }
