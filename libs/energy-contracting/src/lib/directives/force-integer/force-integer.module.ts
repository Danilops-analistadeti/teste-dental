import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ForceIntegerDirective } from './force-integer.directive';

@NgModule({
  declarations: [ForceIntegerDirective],
  imports: [CommonModule],
  bootstrap: [ForceIntegerDirective],
  exports: [ForceIntegerDirective]
})
export class EnergyForceIntegerModule {}
