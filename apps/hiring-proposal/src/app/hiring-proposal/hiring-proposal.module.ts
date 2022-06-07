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
  EnergyConvertDecimalModule,
  EnergyCountDownModule,
  EnergyFooterGeneralModule,
  EnergyLoadingModule,
  EnumHelper,
  EnumUtil
} from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaLoadingModule,
  EsferaNotificationsModule,
  EsferaReplaceModule,
  NgxCurrencyModule
} from '@esferaenergia/esfera-ui';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { environment } from '../../../../../environments/environment';
import { EnergyProposalComponent } from './components/confirm-proposal/components/energy-proposal/energy-proposal.component';
import { ReadjustmentComponent } from './components/confirm-proposal/components/readjustment/readjustment.component';
import { ConfirmProposalComponent } from './components/confirm-proposal/confirm-proposal.component';
import { CustomizationComponent } from './components/customization/customization.component';
import { EnergyComponent } from './components/energy/energy.component';
import { FinancialComponent } from './components/financial/financial.component';
import { MultipleAgentsDialogComponent } from './components/multiple-agents-dialog/multiple-agents-dialog.component';
import { PopupCheckoutComponent } from './components/popup-checkout/popup-checkout.component';
import { CustomizationQuoteSummaryComponent } from './components/quote-summary/components/customization/customization.component';
import { EnergyQuoteSummaryComponent } from './components/quote-summary/components/energy/energy.component';
import { QuoteSummaryComponent } from './components/quote-summary/quote-summary.component';
import { QuoteUnavailableComponent } from './components/quote-unavailable/quote-unavailable.component';
import { RegistrationDataComponent } from './components/registration-data/registration-data.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { HiringProposalRoutingModule } from './hiring-proposal-routing.module';
import { HiringProposalComponent } from './hiring-proposal.component';
import { OfferState } from './states/offer.state';
import { QuotationProposalState } from './states/quotation-proposal.state';

@NgModule({
  declarations: [
    HiringProposalComponent,
    StepperComponent,
    EnergyComponent,
    RegistrationDataComponent,
    ConfirmProposalComponent,
    PopupCheckoutComponent,
    EnergyQuoteSummaryComponent,
    CustomizationQuoteSummaryComponent,
    EnergyProposalComponent,
    ReadjustmentComponent,
    QuoteSummaryComponent,
    QuoteUnavailableComponent,
    MultipleAgentsDialogComponent,
    CustomizationComponent,
    FinancialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    EsferaNotificationsModule,
    NgxCurrencyModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    HiringProposalRoutingModule,
    EsferaButtonModule,
    MatProgressSpinnerModule,
    EnergyCountDownModule,
    NgxsModule.forFeature([QuotationProposalState, OfferState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxMaskModule.forRoot(),
    EnergyLoadingModule,
    EsferaCardItemModule,
    NgxsResetPluginModule,
    EsferaIconModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    EsferaLoadingModule,
    EnergyConvertDecimalModule,
    EsferaReplaceModule,
    EnergyFooterGeneralModule
  ],
  providers: [ConvertDecimalPipe, DatePipe, KeyValuePipe, EnumHelper, EnumUtil]
})
export class HiringProposalModule { }
