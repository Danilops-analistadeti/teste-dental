import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EsferaIconModule } from '@esferaenergia/esfera-ui';
import { UserActionsComponent } from '../../public-api';
import { EnergyClickOutSideModule } from '../directives/click-out-side/click-out-side.module';
import { Menu } from '../menu/menu';
import { SideNavComponent } from './side-nav.component';

const COMPONENTS = [
  SideNavComponent,
  UserActionsComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    EsferaIconModule,
    MatIconModule,
    RouterModule,
    EnergyClickOutSideModule
  ],
  providers: [Menu],
  bootstrap: [SideNavComponent],
  exports: [COMPONENTS]
})
export class EnergySideNavModule { }
