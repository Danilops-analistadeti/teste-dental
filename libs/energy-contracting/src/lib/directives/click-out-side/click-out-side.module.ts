import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutSideDirective } from './click-out-side.directive';

@NgModule({
  declarations: [ClickOutSideDirective],
  imports: [CommonModule],
  bootstrap: [ClickOutSideDirective],
  exports: [ClickOutSideDirective]
})
export class EnergyClickOutSideModule {}
