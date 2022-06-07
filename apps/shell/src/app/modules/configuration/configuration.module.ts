import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EnergyFooterGeneralModule } from '@energy-contracting';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, MatIconModule, ConfigurationRoutingModule, EnergyFooterGeneralModule]
})
export class ConfigurationModule { }
