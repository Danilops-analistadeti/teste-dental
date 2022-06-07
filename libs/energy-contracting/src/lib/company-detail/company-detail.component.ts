import { Component, ViewEncapsulation } from '@angular/core';
import { Company, CompanyGroup } from '../../public-api';

@Component({
  selector: 'ec-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyDetailComponent {
  companyId!: string;
  isLoading!: boolean;
  companyGroup!: CompanyGroup;
  companies!: Company[];

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim().toLowerCase();
    this.companies = this.companyGroup.companies.filter((item) => item?.name?.toLowerCase().includes(filterValue));
  }
}
