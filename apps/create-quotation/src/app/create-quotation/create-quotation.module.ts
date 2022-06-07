import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { CommonModule, DatePipe, KeyValuePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ConvertDecimalPipe,
  CreateQuotationState,
  EnergyCompanyDetailModule,
  EnergyConvertDecimalModule,
  EnergyCreateBillingInfoModule,
  EnergyCustomModalAlertModule,
  EnergyDateMonthYearModule,
  EnergyFooterGeneralModule,
  EnergyLoadingModule,
  EsferaDatepickerModule,
  MultiselectModule
} from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaLoadingModule,
  EsferaNotificationsModule,
  EsferaReplaceModule,
  EsferaUploadModule,
  NgxCurrencyModule
} from '@esferaenergia/esfera-ui';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { CustomizationComponent } from './components/customization/customization.component';
import { EnergyComponent } from './components/energy/energy.component';
import { PaymentConditionsComponent } from './components/payment-conditions/payment-conditions.component';
import { QuoteSummaryComponent } from './components/quote-summary/quote-summary.component';
import { ShippingSettingsComponent } from './components/shipping-settings/shipping-settings.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { SuccessCreateQuotationComponent } from './components/success-create-quotation/success-create-quotation.component';
import { CreateQuotationRoutingModule } from './create-quotation-routing.module';
import { CreateQuotationComponent } from './create-quotation.component';

@NgModule({
  declarations: [
    EnergyComponent,
    StepperComponent,
    CreateQuotationComponent,
    QuoteSummaryComponent,
    ShippingSettingsComponent,
    PaymentConditionsComponent,
    SuccessCreateQuotationComponent,
    CustomizationComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxCurrencyModule,
    MatSelectModule,
    MatRadioModule,
    MultiselectModule,
    CreateQuotationRoutingModule,
    EsferaLoadingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    EsferaButtonModule,
    EsferaIconModule,
    EnergyCompanyDetailModule,
    EsferaCardItemModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    EnergyCreateBillingInfoModule,
    MatSelectModule,
    EsferaReplaceModule,
    EnergyDateMonthYearModule,
    EnergyConvertDecimalModule,
    NgxMaskModule.forRoot(),
    MatDialogModule,
    EnergyLoadingModule,
    EsferaNotificationsModule,
    EsferaDatepickerModule,
    NgxsModule.forFeature([CreateQuotationState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MatProgressSpinnerModule,
    EsferaUploadModule,
    MatListModule,
    MatTooltipModule,
    EnergyCustomModalAlertModule,
    EnergyFooterGeneralModule
  ],
  providers: [KeyValuePipe, ConvertDecimalPipe, DatePipe]
})
export class CreateQuotationModule { }
