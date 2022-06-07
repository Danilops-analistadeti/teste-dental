import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { createLocaleDateToUTC, Offer, OfferStatus, Quotation } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { ExportXlsxInterface } from '../interfaces/export-xlsx.interface';

@Injectable({
  providedIn: 'root'
})
export class ExportXlsxService {
  dismissTime = 2500;

  constructor(private notificationService: NotificationsService, private decimalPipe: DecimalPipe) {}

  downloadExcel(offers: Offer[], quotation: Quotation): void {
    this.alertDownload();
    const rowsExcel: ExportXlsxInterface[] = this.mountRows(offers, quotation);
    this.mountExcelDownload(rowsExcel, quotation);
  }

  alertDownload(): void {
    this.notificationService.info('Download iniciado...', this.dismissTime);
  }

  mountExcelDownload(rowsExcel: ExportXlsxInterface[], quotation: Quotation): void {
    try {
      const file: XLSX.WorkBook = XLSX.utils.book_new();
      const opts: XLSX.JSON2SheetOpts = { skipHeader: true };
      const sht: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rowsExcel, opts);
      XLSX.utils.book_append_sheet(file, sht, 'OFERTAS');
      XLSX.writeFile(file, this.excelNameFile(quotation));
    } catch {
      this.notificationService.error('Erro ao fazer download, tente novamente mais tarde!', this.dismissTime);
    }
  }

  excelNameFile(quotation: Quotation): string {
    return `COTAÇÃO ${quotation?.protocol}.xlsx`;
  }

  mountRows(offert: Offer[], quotation: Quotation): ExportXlsxInterface[] {
    let rowsExcel: ExportXlsxInterface[] = [];
    rowsExcel = this.mountHead(quotation);
    rowsExcel = [...rowsExcel, ...this.mountTitleTable()];
    rowsExcel = [...rowsExcel, ...this.mountDataTable(offert, quotation)];
    return rowsExcel;
  }

  mountDataTable(offerts: Offer[], quotation: Quotation): ExportXlsxInterface[] {
    const rowsXlsx: ExportXlsxInterface[] = [];
    offerts.forEach((offert) => {
      rowsXlsx.push({
        col1: quotation.protocol,
        col2: offert.offererName,
        col3: offert.companyName,
        col4: moment(offert.createdAt).format('DD/MM/YYYY HH:mm'),
        col5: offert.price,
        col6: this.decimalPipe.transform(offert.energyVolumeAverage, '1.3-3'),
        col7: offert.retusd,
        col8: moment(offert.paymentBusinessDay).format('DD/MM/YYYY'),
        col9: moment(offert.proposalExpiration).format('DD/MM/YYYY HH:mm'),
        col10: this.getStatusOffer(offert),
        col11: offert.observation
      });
    });
    return rowsXlsx;
  }

  getStatusOffer(offert: Offer): string {
    if (offert.status === OfferStatus.WINNER) {
      return OfferStatus.WINNER;
    }

    const today = createLocaleDateToUTC();
    const expiration = new Date(offert.proposalExpiration);
    const diff = today.getTime() - expiration.getTime();
    return diff > 0 ? OfferStatus.EXPIRED : OfferStatus.VALID;
  }

  mountHead(quotation: Quotation): ExportXlsxInterface[] {
    const rowHead: ExportXlsxInterface[] = [];
    rowHead.push({
      col1: `Cotação: ${quotation?.protocol}, Solicitante: ${quotation?.owner?.name}, Submercado: ${quotation?.subMarketRegion}`
    });
    return rowHead;
  }

  mountTitleTable(): ExportXlsxInterface[] {
    const rowTitleTable: ExportXlsxInterface[] = [];
    rowTitleTable.push({ col1: null });
    rowTitleTable.push({
      col1: 'ID',
      col2: 'Ofertante',
      col3: 'Empresa',
      col4: 'Data da Oferta',
      col5: 'Preço (R$ /MWh)',
      col6: 'Volume (MWméd)',
      col7: 'Retusd (R$ /MWh)',
      col8: 'Data de pagamento',
      col9: 'Validade',
      col10: 'Status da oferta',
      col11: 'Observações'
    });
    return rowTitleTable;
  }
}
