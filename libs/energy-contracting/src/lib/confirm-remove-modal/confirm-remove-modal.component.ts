import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ec-confirm-remove-billing-info',
  templateUrl: './confirm-remove-modal.component.html',
  styleUrls: ['./confirm-remove-modal.component.scss']
})
export class ConfirmRemoveModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }
}
