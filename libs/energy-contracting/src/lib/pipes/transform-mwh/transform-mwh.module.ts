import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TransformMwhPipe } from './transform-mwh.pipe';

@NgModule({
  declarations: [TransformMwhPipe],
  imports: [
    CommonModule,
  ],
  providers: [TransformMwhPipe],
  exports: [TransformMwhPipe]
})

export class EnergyTransformMwhModule {
}
