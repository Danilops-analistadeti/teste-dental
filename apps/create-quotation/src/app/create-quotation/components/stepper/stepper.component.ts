import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'ec-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  selected = new FormControl(0);
  offersDisabled = true;
  customizationDisabled = true;
  paymentConditionsDisabled = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  changedStep(nextStep: number): void {
    this.selected.setValue(nextStep);
    this.selected.enable();

    if (nextStep !== 0) {
      this.customizationDisabled = false;
    }

    if (nextStep === 2) {
      this.paymentConditionsDisabled = false;
    }

    if (nextStep === 3) {
      this.offersDisabled = false;
    }

    this.changeDetectorRef.detectChanges();
  }

  onTabChanged(matTab: MatTabChangeEvent): void {
    this.selected.setValue(matTab.index);
  }
}
