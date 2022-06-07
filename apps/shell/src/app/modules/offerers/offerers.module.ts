import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { EnergyLoadingModule } from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaListTemplateModule
} from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from 'ngx-mask';
import { OfferersItemComponent } from './components/offerers-item/offerers-item.component';
import { SendInviteComponent } from './components/send-invite/send-invite.component';
import { OfferersComponent } from './offerers.component';

const routes: Routes = [
  {
    path: '',
    component: OfferersComponent
  }
];

@NgModule({
  declarations: [OfferersComponent, SendInviteComponent, OfferersItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    EsferaListTemplateModule,
    EsferaCardItemModule,
    EsferaButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskModule,
    EsferaIconModule,
    MatDialogModule,
    EnergyLoadingModule,
    MatIconModule
  ]
})
export class OfferersModule {}
