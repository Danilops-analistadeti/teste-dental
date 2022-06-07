import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent, EnumUtil, getCustomizationDescription, getFinancialGuarantee, INDEXER, Quotation, QuotationFile, QuotationService } from '@energy-contracting';
import { BlobPdf, BlobWord, FileService, NotificationsService } from '@esferaenergia/esfera-ui';
import { timer } from 'rxjs';
import { HiringProposalService } from '../../../../services/hiring-proposal.service';

@Component({
  selector: 'ec-customization-quote-summary',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizationQuoteSummaryComponent implements OnInit {
  @Input() quotation: Quotation;
  files: QuotationFile[] = [];
  showAllFiles = false;
  indexerEnum = INDEXER;

  constructor(
    private enumPipe: EnumUtil,
    private dialog: MatDialog,
    private fileService: FileService,
    private hiringProposalService: HiringProposalService,
    private quotationService: QuotationService,
    private notificationsService: NotificationsService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getQuotationFiles();
  }

  get financialGuarantee(): string {
    return getFinancialGuarantee(this.quotation?.financialGuarantee);
  }

  get modulationType(): string {
    return this.quotation?.modulationType
      ? this.enumPipe.getModulationType(this.quotation?.modulationType.toString()).value
      : '';
  }

  getCustomizationDescriptionInput(minimum: number, maximum: number): string {
    return getCustomizationDescription(minimum, maximum);
  }

  getQuotationFiles(): void {
    this.hiringProposalService
      .getQuotationFiles(this.quotation.id)
      .subscribe({
        next: (files) => (this.files = files)
      })
      .add(() => this.changeDetectorRef.detectChanges());
  }

  downloadFile(file: QuotationFile): void {
    const confirmModalComponent = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: file.name,
        content: 'Deseja baixar o arquivo?'
      }
    });

    confirmModalComponent.afterClosed().subscribe({
      next: (download: string) => {
        if (download === 'true') {
          this.downloadQuotationFile(this.quotation.id, file);
        }
      }
    });
  }

  downloadAllFiles(): void {
    const confirmModalComponent = this.dialog.open(ConfirmModalComponent, {
      data: {
        title: 'Download anexos',
        content: 'Deseja baixar todos os arquivos?'
      }
    });

    confirmModalComponent.afterClosed().subscribe({
      next: (download: string) => {
        if (download === 'true') {
          this.quotation.files.forEach(file => {
            timer(500).subscribe({
              next: () => this.downloadQuotationFile(this.quotation.id, file)
            });
          });
        }
      }
    });

  }

  downloadQuotationFile(quotationId: string, file: QuotationFile): void {
    const fileType = file.name.split('.')[1].toLowerCase();
    const type = fileType === 'pdf' ? BlobPdf : BlobWord;
    this.quotationService.getQuotationFileData(quotationId, file.id).subscribe({
      next: (base64) => this.fileService.download(this.fileService.base64ToBlob(base64, type), file.name),
      error: ({ error }) =>
        this.notificationsService.error(
          error.message ?? 'Ops ocorreu um error ao tentar baixar o arquivo, tente novamente mais tarde!'
        )
    });
  }

  trackByFiles(file: QuotationFile): string {
    return file.id;
  }
}
