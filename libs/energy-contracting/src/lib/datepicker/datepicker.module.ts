import { CommonModule, DatePipe } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EsferaIconModule } from '@esferaenergia/esfera-ui';
import { MaskService, NgxMaskModule } from 'ngx-mask';
import { EnergyLoadingModule } from '../es-loading/es-loading.module';
import { DatepickerComponent } from './datepicker.component';

@NgModule({
  declarations: [DatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule.forChild(),
    EsferaIconModule,
    EnergyLoadingModule
  ],
  exports: [DatepickerComponent],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    MaskService
  ]
})
export class EsferaDatepickerModule {}
