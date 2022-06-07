import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomModalAlert } from './interfaces/custom-modal-alert.interface';

@Component({
  selector: 'lib-custom-alert',
  templateUrl: './custom-modal-alert.component.html',
  styleUrls: ['./custom-modal-alert.component.scss'],
})
export class CustomModalAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CustomModalAlert) {}

  notAppearAgain(): void {
    localStorage.setItem(this.data.id, this.data.id);
  }
}
