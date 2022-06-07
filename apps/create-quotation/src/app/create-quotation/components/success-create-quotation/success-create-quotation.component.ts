import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateQuotationState } from '@energy-contracting';
import { Store } from '@ngxs/store';
import { StateOverwrite } from 'ngxs-reset-plugin';

@Component({
  selector: 'ec-success-create-quotation',
  templateUrl: './success-create-quotation.component.html',
  styleUrls: ['./success-create-quotation.component.scss']
})
export class SuccessCreateQuotationComponent {
  constructor(
    private router: Router,
    private store: Store,
    public dialogRef: MatDialogRef<SuccessCreateQuotationComponent>
  ) {}

  returnInitial(): void {
    this.router.navigateByUrl('/');
    this.store.dispatch(new StateOverwrite([CreateQuotationState, {}]));
    this.dialogRef.close();
  }
}
