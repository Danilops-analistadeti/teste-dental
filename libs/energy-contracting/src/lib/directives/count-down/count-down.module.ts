import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CountDownDirective } from './count-down.directive';

@NgModule({
  declarations: [CountDownDirective],
  imports: [CommonModule],
  bootstrap: [CountDownDirective],
  exports: [CountDownDirective]
})
export class EnergyCountDownModule {}
