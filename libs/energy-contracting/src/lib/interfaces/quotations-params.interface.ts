import { SortDirection } from '@angular/material/sort';
import { QuotationsFilters } from './quotation-filters.interface';

export interface QuotationsParams {
  page?: number;
  itemsPerPage?: number;
  order?: SortDirection;
  orderBy?: string;
  filters?: QuotationsFilters;
}
