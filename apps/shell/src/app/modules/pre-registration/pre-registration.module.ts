import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EnergyLoadingModule, MultiselectModule } from '@energy-contracting';
import { EsferaButtonModule, EsferaNotificationsModule } from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from 'ngx-mask';
import { RegistrationInformationComponent } from './components/registration-information/registration-information.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SuccessRegistrationComponent } from './components/success-registration/success-registration.component';
import { PreRegistrationRoutingModule } from './pre-registration-routing.module';
import { PreRegistrationComponent } from './pre-registration.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    PreRegistrationComponent,
    RegistrationInformationComponent,
    SuccessRegistrationComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    PreRegistrationRoutingModule,
    MultiselectModule,
    MatIconModule,
    MatCheckboxModule,
    EsferaButtonModule,
    MatCardModule,
    EsferaNotificationsModule,
    NgxMaskModule,
    MatIconModule,
    EnergyLoadingModule
  ]
})
export class PreRegistrationModule {}
