import { KeyValuePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio/public-api';
import {
  CreateQuotationState,
  CUSTOMIZATION,
  Customization,
  FinancialGuarantee,
  FinancialsGuaranteeService,
  ModulationType,
  QuotationData,
  ResourcesCustomization,
  sizeFormArrayValidator,
  stepsValidator
} from '@energy-contracting';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ec-customization-component',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizationComponent implements OnInit, AfterViewInit {
  customizationForm: FormGroup;
  financialsGuarantee: FinancialGuarantee[];
  resources!: ResourcesCustomization;

  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private keyValuePipe: KeyValuePipe,
    private changeDetectorRef: ChangeDetectorRef,
    private financialsGuaranteeService: FinancialsGuaranteeService
  ) {
    this.resources = {
      modulationType: this.keyValuePipe.transform(ModulationType)
    };
  }

  ngAfterViewInit(): void {
    this.onCustomizationFormChange();
  }

  ngOnInit(): void {
    this.buildForm();
    this.preloadFinancialsGuarantee();
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
      modulationType: new FormControl(CUSTOMIZATION.DEFAULT_VALUE_MODULATION_TYPE, Validators.required),
      financialGuarantee: new FormArray(CUSTOMIZATION.DEFAULT_VALUE_FINANCIAL_GUARANTEE, sizeFormArrayValidator)
    });
  }

  preloadFinancialsGuarantee(): void {
    this.financialsGuaranteeService
      .getFinancialsGuarantee()
      .subscribe({
        next: (response: FinancialGuarantee[]) => {
          this.financialsGuarantee = response;
          this.parseStateQuotationToCustomizationForm();
        }
      })
      .add(() => this.changeDetectorRef.detectChanges());
  }

  parseStateQuotationToCustomizationForm(): void {
    const { customization } = this.store.selectSnapshot(CreateQuotationState);

    this.addCheckboxesFinancialGuarantee(this.financialsGuarantee, customization);

    if (customization) {
      this.patchCustomizationFormValues(customization);
    }
  }

  patchCustomizationFormValues(customization: Customization): void {
    delete customization.financialGuarantee;
    this.customizationForm.patchValue(customization);
    this.setInputsModulationType(customization.modulationType.toString());
  }

  onCustomizationFormChange(): void {
    this.customizationForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (customization: Customization) => {
        customization.financialGuarantee = this.getFinancialsGuaranteeSelected();
        this.store.dispatch(new QuotationData({ customization }));
      }
    });
  }

  get financialsGuaranteeFormArray(): FormArray {
    return this.customizationForm.controls.financialGuarantee as FormArray;
  }

  addCheckboxesFinancialGuarantee(
    financialsGuarantee: FinancialGuarantee[],
    customizationState: Customization = null
  ): void {
    this.financialsGuaranteeFormArray.clear();
    financialsGuarantee.forEach((item) => {
      let selected = customizationState?.financialGuarantee?.some((f) => f.id === item.id) ?? false;
      if (!customizationState && item.alias === CUSTOMIZATION.REGISTRATION_AFTER_PAYMENT) {
        selected = true;
      }
      this.financialsGuaranteeFormArray.push(new FormControl(selected));
    });
  }

  getFinancialsGuaranteeSelected(): FinancialGuarantee[] {
    return this.financialsGuaranteeFormArray.controls
      .map((item, i) => (item.value ? this.financialsGuarantee[i] : null))
      .filter((item) => item !== null);
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
    this.customizationForm.valid ? this.changedStep.next(2) : this.customizationForm.markAllAsTouched();
  }
}
