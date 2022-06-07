import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OBSERVATION } from './constants/observation.constant';

@Component({
  selector: 'ec-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObservationComponent {
  observation: string = OBSERVATION;

  constructor(public dialogRef: MatDialogRef<ObservationComponent>) {}

  close(choice: boolean): void {
    this.dialogRef.close({ observation: this.observation, close: choice });
  }
}
