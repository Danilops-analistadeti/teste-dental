import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnergyFooterGeneralModule, EnergySideNavModule } from '@energy-contracting';
import { EsferaNotificationsModule } from '@esferaenergia/esfera-ui';
import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { LoggedAreaComponent } from './logged-area.component';

@NgModule({
  declarations: [LoggedAreaComponent],
  imports: [CommonModule, LoggedAreaRoutingModule, EsferaNotificationsModule, EnergySideNavModule, EnergyFooterGeneralModule]
})
export class LoggedAreaModule {}
