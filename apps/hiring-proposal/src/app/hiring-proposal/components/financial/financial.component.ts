import { KeyValuePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  CUSTOMIZATION,
  FinancialGuarantee,
  FinancialsGuaranteeService,
  INDEXER,
  Offer,
  sizeFormArrayValidator
} from '@energy-contracting';
import { Store } from '@ngxs/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { OfferAction } from '../../actions/hiring-proposal.action';
import { STEPPER_NUMBER_CUSTOMIZATION, STEPPER_NUMBER_REGISTRATION } from '../../constant/stepper.constant';
import { OfferState } from '../../states/offer.state';
import { INIT_LOADING_FINANCIAL } from './constants/init-loading-financial';
import { ResourcesFinancial } from './interfaces/resources-financial.interface';

@Component({
  selector: 'ec-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit, AfterViewInit {
  @Output() changedStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() backedStep: EventEmitter<number> = new EventEmitter<number>();

  financialForm: FormGroup;
  resources: ResourcesFinancial;
  financialsGuarantee: FinancialGuarantee[];
  minDate = new Date();
  loading = INIT_LOADING_FINANCIAL;
  indexer = INDEXER;

  constructor(
    private formBuilder: FormBuilder,
    private keyValuePipe: KeyValuePipe,
    private financialsGuaranteeService: FinancialsGuaranteeService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.resources = {
      indexer: this.keyValuePipe.transform(INDEXER)
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
    this.financialForm = this.formBuilder.group({
      indexer: new FormControl('NONE'),
      financialGuarantee: new FormArray([], sizeFormArrayValidator)
    });
  }

  onCustomizationFormChange(): void {
    this.financialForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (offer: Offer) => {
        offer.financialGuarantee = this.getFinancialsGuaranteeSelected() as unknown as string[];
        this.store.dispatch(new OfferAction(offer));
      }
    });
  }

  preloadFinancialsGuarantee(): void {
    this.loading.getFinancialsGuarantee = true;
    this.financialsGuaranteeService
      .getFinancialsGuarantee()
      .subscribe({
        next: (response: FinancialGuarantee[]) => {
          this.financialsGuarantee = response;
          this.parseStateFinancialForm();
        }
      })
      .add(() => {
        this.loading.getFinancialsGuarantee = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  parseStateFinancialForm(): void {
    const offer: Offer = this.store.selectSnapshot(OfferState);

    if (offer) {
      this.addCheckboxesFinancialGuarantee(this.financialsGuarantee, offer.financialGuarantee);
      this.financialForm.get('indexer').setValue(offer.indexer);
    }
  }

  getFinancialsGuaranteeSelected(): FinancialGuarantee[] {
    return this.financialsGuaranteeFormArray.controls
      .map((item, i) => (item.value ? this.financialsGuarantee[i] : null))
      .filter((item) => item !== null);
  }

  addCheckboxesFinancialGuarantee(
    financialsGuarantee: FinancialGuarantee[],
    financialsGuaranteeState: string[] | FinancialGuarantee[] = null
  ): void {
    this.financialsGuaranteeFormArray.clear();
    financialsGuarantee.forEach((item) => {
      let selected = financialsGuaranteeState?.some((f) => f.id === item.id) ?? false;
      if (!financialsGuaranteeState && item.alias === CUSTOMIZATION.REGISTRATION_AFTER_PAYMENT) {
        selected = true;
      }
      this.financialsGuaranteeFormArray.push(new FormControl(selected));
    });
  }

  nextForm(): void {
    this.financialForm.valid
      ? this.changedStep.next(STEPPER_NUMBER_REGISTRATION)
      : this.financialForm.markAllAsTouched();
  }

  backStep(): void {
    this.backedStep.next(STEPPER_NUMBER_CUSTOMIZATION);
  }

  get financialsGuaranteeFormArray(): FormArray {
    return this.financialForm.controls.financialGuarantee as FormArray;
  }
}
