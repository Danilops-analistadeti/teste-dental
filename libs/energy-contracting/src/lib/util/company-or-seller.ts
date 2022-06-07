import { Owner } from '../../public-api';
import { QuotationType } from '../enums/quotation-type.enum';
import { CompanyOrSeller } from '../interfaces/company-seller.interface';


export function companyOrSeller(offer: string, quotationCompanys: Owner[], quotationType: string, columnName = "fantasyName"): CompanyOrSeller {
  return {
    companyBuyers: QuotationType[quotationType] === QuotationType.BUYER ? quotationCompanys?.map(e => e[columnName]).join(", ") : offer,
    companySellers: QuotationType[quotationType] === QuotationType.BUYER ? offer : quotationCompanys?.map(e => e[columnName]).join(", ")
  }
}
