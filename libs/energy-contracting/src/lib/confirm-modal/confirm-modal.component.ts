import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModalData } from "./interfaces/confirm-modal-data.interface";

@Component({
  selector: 'ec-confirm-remove-billing-info',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmModalData) { }
}