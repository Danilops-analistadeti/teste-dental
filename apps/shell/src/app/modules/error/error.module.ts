import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EsferaButtonModule } from '@esferaenergia/esfera-ui';
import { ForbbidenComponent } from './components/forbbiden/forbbiden.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [ForbbidenComponent],
  imports: [CommonModule, EsferaButtonModule, ErrorRoutingModule]
})
export class ErrorModule {}
