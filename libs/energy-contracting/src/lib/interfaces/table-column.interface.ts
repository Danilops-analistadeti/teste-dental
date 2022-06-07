export interface TableColumn {
  displayCol: string;
  headerCol?: string;
  isCurrency?: boolean;
  isDate?: boolean;
  unsortable?: boolean;
  isVolume?: boolean;
  isPriceWithVolume?: boolean;
  isDateWithHours?: boolean;
  isNameCompany?: boolean;
  isAction?: boolean;
  subHeader?: string;
  isObservation?: boolean;
  isCreateAt?: boolean;
  noTemplate?: boolean;
  isCustomization?: boolean;
  condicionalCol?: string;
  isStatus?: boolean;
}
