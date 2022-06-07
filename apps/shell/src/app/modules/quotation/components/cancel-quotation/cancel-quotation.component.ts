import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotationService } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { CancelQuotationDialogData } from '../../interfaces/cancel-quotation-dialog-data';

@Component({
  selector: 'ec-cancel-quotation',
  templateUrl: './cancel-quotation.component.html',
  styleUrls: ['./cancel-quotation.component.scss']
})
export class CancelQuotationComponent {
  justificationControl = new FormControl(null);
  loading!: boolean;

  constructor(
    private quotationService: QuotationService,
    private notification: NotificationsService,
    public dialogRef: MatDialogRef<CancelQuotationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: CancelQuotationDialogData
  ) {}

  submit(): void {
    this.loading = true;
    this.quotationService
      .cancelQuotation(this.data.id, this.justificationControl.value)
      .subscribe({
        next: () => this.notification.success('Cotação cancelada com sucesso!'),
        error: ({ error }) => this.notification.error(error?.message ?? 'Não foi possível cancelar a cotação!')
      })
      .add(() => this.dialogRef.close());
  }
}
