import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  BillingInfo,
  CompanyGroups,
  convertStringToDate,
  CreateQuotation,
  CreateQuotationState,
  EnergySource,
  FinancialGuarantee,
  getCustomizationDescription,
  getEnumKeyByEnumValue,
  getFinancialGuarantee,
  INDEXER,
  ModulationType,
  Owner,
  Quotation,
  QuotationFile,
  QuotationService,
  QuotationType,
  SubMarketRegion
} from '@energy-contracting';
import { FileService, NotificationsService, transformFileSize } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { TransformedQuotation } from '../../interfaces/transformed-quotation.interface';
import { SuccessCreateQuotationComponent } from '../success-create-quotation/success-create-quotation.component';

@Component({
  selector: 'ec-quote-summary',
  templateUrl: './quote-summary.component.html',
  styleUrls: ['./quote-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteSummaryComponent implements OnInit, OnDestroy {
  @Input() quotation: CreateQuotation;

  dateNow = new Date();
  isLoading: boolean;
  observation: string;
  filesControl = new FormControl();
  filesUploaded: Map<string, boolean> = new Map();
  files: QuotationFile[] = [];
  modulationType = ModulationType;

  constructor(
    private quotationService: QuotationService,
    private notificationsService: NotificationsService,
    private fileService: FileService,
    private dialog: MatDialog,
    private store: Store,
    private changeDetector: ChangeDetectorRef,
    private datePipe: DatePipe
  ) { }

  ngOnDestroy(): void {
    this.store.dispatch(new StateReset(CreateQuotationState));
  }

  ngOnInit(): void {
    this.getQuotationData();
  }

  getQuotationData(): void {
    this.store.select(CreateQuotationState).subscribe({
      next: (response) => {
        this.quotation = response;
        this.changeDetector.detectChanges();
      }
    });
  }

  get financialGuarantee(): string {
    return getFinancialGuarantee(this.quotation?.customization?.financialGuarantee);
  }

  getCustomizationDescriptionInput(minimum: number, maximum: number): string {
    return getCustomizationDescription(minimum, maximum);
  }

  transformQuotation({
    energy,
    shippingSettings,
    paymentConditions,
    customization
  }: CreateQuotation): TransformedQuotation {
    return {
      ...energy,
      ...shippingSettings,
      ...paymentConditions,
      ...customization,
      files: this.files
    };
  }

  parseCreateQuotation(data: TransformedQuotation): Partial<Quotation> {
    const groups = (data.companyGroups as CompanyGroups[])
      .filter((e: CompanyGroups) => !!e?.id)
      .map((e: CompanyGroups) => e.id);

    const startDateTranform = `${this.datePipe.transform(convertStringToDate(data.startDate), 'yyyy-MM-dd')} 03:00`;
    const endDateTransform = `${this.datePipe.transform(convertStringToDate(data.endDate), 'yyyy-MM-dd')} 03:00`;

    const energyVolumeAverage = data.energyVolumeAverage?.replace(/[.]/g, '').replace(/[,]/g, '.');
    const energyVolumeHour = data.energyVolumeHour?.replace(/[.]/g, '').replace(/[,]/g, '.');

    return {
      ...data,
      billingInfo: (data.billingInfo as BillingInfo)?.id,
      quotationType: getEnumKeyByEnumValue(QuotationType, data.quotationType),
      subMarketRegion: getEnumKeyByEnumValue(SubMarketRegion, data.subMarketRegion),
      indexer: getEnumKeyByEnumValue(INDEXER, data.indexer),
      energySource: getEnumKeyByEnumValue(EnergySource, data.energySource),
      companyGroups: groups,
      ownerId: data.ownerId?.map((owner: Owner) => owner.id),
      endDate: endDateTransform,
      startDate: startDateTranform,
      financialGuarantee: (data.financialGuarantee as FinancialGuarantee[])?.map((c: FinancialGuarantee) => c.id),
      observation: this.observation,
      modulationType: data.modulationType ?? undefined,
      energyVolumeHour,
      energyVolumeAverage
    };
  }

  createQuotation(): void {
    this.isLoading = true;
    if (this.checkValuesEnergy() && this.checkValuesPayment() && this.checkValuesOfferers()) {
      const transformedQuotation = this.transformQuotation(this.quotation);
      const quotation = this.parseCreateQuotation(transformedQuotation);

      this.quotationService
        .createQuotation(quotation)
        .subscribe({
          next: () =>
            this.dialog.open(SuccessCreateQuotationComponent, {
              disableClose: true
            }),
          error: ({ error }) => this.notificationsService.error(error?.message)
        })
        .add(() => {
          this.isLoading = false;
          this.changeDetector.detectChanges();
        });
    } else {
      this.isLoading = false;
      this.notificationsService.error('Por favor, preencha todos os passos da cotação.');
      this.changeDetector.detectChanges();
    }
  }

  checkValuesEnergy(): boolean {
    return !!(this.quotation?.energy &&
      this.quotation?.energy?.quotationType &&
      this.quotation?.energy?.startDate &&
      this.quotation?.energy?.endDate &&
      this.quotation?.energy?.energyVolumeAverage &&
      this.quotation?.energy?.energyVolumeHour &&
      this.quotation?.energy?.energySource &&
      this.quotation?.energy?.subMarketRegion &&
      this.quotation?.energy?.priceType)
  }

  checkValuesPayment(): boolean {
    return !!this.quotation?.paymentConditions;
  }

  checkValuesOfferers(): boolean {
    return !!(this.quotation?.shippingSettings &&
      this.quotation?.shippingSettings.companyGroups &&
      this.quotation?.shippingSettings.proposalSubmission &&
      this.quotation?.shippingSettings.expiration);
  }

  transformSize(size: number): string {
    return transformFileSize(size);
  }

  removeFile(index: number): void {
    const removedFile = this.filesControl.value.splice(index, 1);
    this.files.splice(
      this.files.findIndex((file) => file.name === removedFile.name),
      1
    );
    this.changeDetector.detectChanges();
  }

  async onFileControlChange(files: File[]): Promise<void> {
    if (files.length > 5) {
      files.pop();
      this.notificationsService.error('Você excedeu o limite de 5 arquivos!');
      return;
    }

    const filesUnuploaded = files.filter((file) => !this.filesUploaded.has(file.name));
    for (const file of filesUnuploaded) {
      await this.uploadFile(file);
    }
  }

  async uploadFile(file: File): Promise<void> {
    const filename = file.name;
    const base64 = await this.transformInBase64(file);
    this.quotationService
      .saveQuotationFile(base64, filename)
      .subscribe({
        next: (uploadedFile: QuotationFile) => {
          this.files.push(uploadedFile);
          this.filesUploaded.set(filename, true);
        },
        error: () => {
          this.filesUploaded.delete(filename);
          this.notificationsService.error('Não foi possível fazer o upload do arquivo');
        }
      })
      .add(() => this.changeDetector.detectChanges());
  }

  async transformInBase64(file: File): Promise<string> {
    this.filesUploaded.set(file.name, false);
    this.changeDetector.detectChanges();
    const base64 = (await this.fileService.fileToBase64(file)) as string;
    return base64.split('base64,')[1];
  }
}
