import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EsferaIconModule } from '@esferaenergia/esfera-ui';
import { DateMonthYearComponent } from './date-month-year.component';

const COMPONENTS = [DateMonthYearComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    EsferaIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatMomentDateModule
  ],
  bootstrap: [COMPONENTS],
  exports: [COMPONENTS]
})
export class EnergyDateMonthYearModule {}
