import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { CommonModule, DatePipe, DecimalPipe, KeyValuePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ConvertDecimalPipe,
  EnergyConvertDecimalModule,
  EnergyCountDownModule,
  EnergyCreateBillingInfoModule,
  EnergyDetailProposalModule,
  EnergyFooterProposalModule,
  EnergyLoadingModule,
  EnergyMonthPickerModule,
  EnergyQuotationTypeModule,
  EnergyTransformMwhModule,
  MultiselectModule
} from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaIconModule,
  EsferaLoadingModule,
  EsferaModalModule,
  EsferaReplaceModule,
  EsferaSkeletonModule,
  EsferaVirtualScrollModule,
  NgxCurrencyModule
} from '@esferaenergia/esfera-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxsModule } from '@ngxs/store';
import { httpInterceptorProviders } from '../../token';
import { CancelQuotationComponent } from './components/cancel-quotation/cancel-quotation.component';
import { ConfirmOfferComponent } from './components/confirm-offer/confirm-offer.component';
import { ObservationComponent } from './components/confirm-offer/observation/observation.component';
import { DetailCustomizationOfferComponent } from './components/offers-received/components/detail-customization-offer/detail-customization-offer';
import { OffersReceivedComponent } from './components/offers-received/offers-received.component';
import { QuotationFilterHeaderComponent } from './components/quotation-filter-header/quotation-filter-header.component';
import { QuotationHeaderComponent } from './components/quotation-header/quotation-header.component';
import { QuotationItemSkeletonComponent } from './components/quotation-item-skeleton/quotation-item-skeleton.component';
import { QuotationItemComponent } from './components/quotation-item/quotation-item.component';
import { QuotationSortHeaderComponent } from './components/quotation-sort-header/quotation-sort-header.component';
import { QuotationsComponent } from './components/quotations/quotations.component';
import { QuotationDateTimerPipe } from './pipes/quotation-date-timer.pipe';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';

@NgModule({
  declarations: [
    QuotationComponent,
    CancelQuotationComponent,
    QuotationsComponent,
    OffersReceivedComponent,
    DetailCustomizationOfferComponent,
    QuotationItemComponent,
    QuotationHeaderComponent,
    QuotationSortHeaderComponent,
    QuotationDateTimerPipe,
    ConfirmOfferComponent,
    ObservationComponent,
    QuotationFilterHeaderComponent,
    QuotationItemSkeletonComponent,
    CancelQuotationComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    NgxCurrencyModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    QuotationRoutingModule,
    MatSelectModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSortModule,
    EsferaModalModule,
    EsferaButtonModule,
    MultiselectModule,
    MatSlideToggleModule,
    EsferaVirtualScrollModule,
    EsferaReplaceModule,
    MatStepperModule,
    EsferaIconModule,
    NgSelectModule,
    EsferaSkeletonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatCheckboxModule,
    EnergyLoadingModule,
    EnergyQuotationTypeModule,
    EnergyMonthPickerModule,
    EnergyDetailProposalModule,
    EnergyCountDownModule,
    EnergyCreateBillingInfoModule,
    EnergyFooterProposalModule,
    EnergyConvertDecimalModule,
    EnergyTransformMwhModule,
    EsferaLoadingModule,
    NgxsModule.forFeature()
  ],
  providers: [httpInterceptorProviders, DatePipe, DecimalPipe, QuotationDateTimerPipe, KeyValuePipe, ConvertDecimalPipe]
})
export class QuotationModule {}
