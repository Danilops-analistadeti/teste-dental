import { KeyValuePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import {
  CUSTOMIZATION,
  FinancialGuarantee,
  ModulationType,
  Offer,
  ResourcesCustomization,
  stepsValidator
} from '@energy-contracting';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { OfferAction } from '../../actions/hiring-proposal.action';
import { STEPPER_NUMBER_ENERGY, STEPPER_NUMBER_FINANCIAL } from '../../constant/stepper.constant';
import { OfferState } from '../../states/offer.state';

@Component({
  selector: 'ec-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizationComponent implements OnInit, AfterViewInit {
  customizationForm: FormGroup;
  financialsGuarantee: FinancialGuarantee[];
  resources!: ResourcesCustomization;

  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() backedStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(private store: Store, private formBuilder: FormBuilder, private keyValuePipe: KeyValuePipe) {
    this.resources = {
      modulationType: this.keyValuePipe.transform(ModulationType)
    };
  }

  ngAfterViewInit(): void {
    this.onCustomizationFormChange();
  }

  ngOnInit(): void {
    this.buildForm();
    this.parseStateQuotationToCustomizationForm();
  }

  buildForm(): void {
    const validateCompose = Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(100),
      stepsValidator
    ]);

    this.customizationForm = this.formBuilder.group({
      minimumSeasonality: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, validateCompose),
      maximumSeasonality: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, validateCompose),
      minimumFlexibility: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, validateCompose),
      maximumFlexibility: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, validateCompose),
      minimalModulation: new FormControl(
        { value: CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, disabled: true },
        validateCompose
      ),
      maximumModulation: new FormControl(
        { value: CUSTOMIZATION.DEFAULT_VALUE_CUSTOMIZATION, disabled: true },
        validateCompose
      ),
      modulationType: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_MODULATION_TYPE, Validators.required)
    });
  }

  parseStateQuotationToCustomizationForm(): void {
    const offer: Offer = this.store.selectSnapshot(OfferState);

    if (offer) {
      this.patchCustomizationFormValues(offer);
    }
  }

  patchCustomizationFormValues(offer: Offer): void {
    this.customizationForm.patchValue(offer);
    this.setInputsModulationType(offer.modulationType.toString());
  }

  onCustomizationFormChange(): void {
    this.customizationForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (offer: Offer) => {
        this.store.dispatch(new OfferAction(offer));
      }
    });
  }

  changeModulationType(event: MatRadioChange): void {
    this.setInputsModulationType(event.value);
  }

  setInputsModulationType(modulationType: string): void {
    const minimalModulationControl = this.customizationForm.get('minimalModulation');
    const maximumModulationControl = this.customizationForm.get('maximumModulation');
    if (modulationType === CUSTOMIZATION.DEFAULT_VALUE_MODULATION_TYPE) {
      minimalModulationControl.setValue(0);
      maximumModulationControl.setValue(0);
      minimalModulationControl.disable({ emitEvent: false });
      maximumModulationControl.disable({ emitEvent: false });
    } else {
      minimalModulationControl.enable();
      maximumModulationControl.enable();
    }
  }

  nextForm(): void {
    this.customizationForm.valid
      ? this.changedStep.next(STEPPER_NUMBER_FINANCIAL)
      : this.customizationForm.markAllAsTouched();
  }

  backStep(): void {
    this.backedStep.next(STEPPER_NUMBER_ENERGY);
  }
}
