import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConvertDecimalPipe } from './convert-decimal.pipe';

@NgModule({
  declarations: [ConvertDecimalPipe],
  imports: [
    CommonModule,
  ],
  providers: [ConvertDecimalPipe],
  exports: [ConvertDecimalPipe]
})

export class EnergyConvertDecimalModule {
}
