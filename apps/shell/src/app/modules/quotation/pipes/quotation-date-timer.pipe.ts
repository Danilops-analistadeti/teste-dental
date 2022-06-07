import { Pipe, PipeTransform } from '@angular/core';
import { generateDateWithState, Quotation, QuotationStatus } from '@energy-contracting';

@Pipe({
  name: 'quotationDateTimer'
})
export class QuotationDateTimerPipe implements PipeTransform {
  transform(quotation: Quotation): string {
    const status = QuotationStatus[quotation.status];

    if (status !== QuotationStatus.FINISHED) {
      const checkDate = status === QuotationStatus.ACTIVE ? quotation?.proposalSubmission : quotation?.expiration;

      const date = generateDateWithState(checkDate);
      let dateString = '';

      if (date?.hour) {
        dateString += `${date.hour}h`;
      }

      if (date?.minute) {
        dateString += ` ${date.minute}min`;
      }

      return dateString;
    }
  }
}
