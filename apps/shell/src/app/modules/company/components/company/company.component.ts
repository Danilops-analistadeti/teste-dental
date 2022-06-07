import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CompanyDetailComponent,
  companyDetailModal,
  CompanyGroup,
  CompanyGroups,
  CompanyGroupService,
  ConfirmRemoveModalComponent,
  CreateCompanyGroupComponent,
  createCompanyGroupModal
} from '@energy-contracting';
import { EsferaCardColumn, NotificationsService } from '@esferaenergia/esfera-ui';
import { Observable } from 'rxjs';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { COMPANY_CARD_COLUMNS } from './constants/company-card-columns.constant';
import { confirmRemoveCompanyModal } from './constants/confirm-remove-company-modal.constant';
import { editGroupModal } from './constants/edit-group-modal.constant';

@Component({
  selector: 'ec-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
  companyGroups$: Observable<CompanyGroups[]>;
  companyColumns: EsferaCardColumn[] = COMPANY_CARD_COLUMNS;
  isLoading!: boolean;

  constructor(
    private companyGroupService: CompanyGroupService,
    private dialog: MatDialog,
    private notificationsService: NotificationsService,
    private companyService: CompanyGroupService
  ) {}

  ngOnInit(): void {
    this.searchGroups();
  }

  searchGroups(): void {
    this.companyGroups$ = this.companyGroupService.getCompanyGroups();
  }

  openModalCreateGroup(): void {
    const dialogRef = this.dialog.open(CreateCompanyGroupComponent, createCompanyGroupModal);

    dialogRef.afterClosed().subscribe({
      next: (close) => {
        if (close) {
          this.searchGroups();
        }
      }
    });
  }

  openConfirmRemoveModal(item: CompanyGroups): void {
    const dialogRef = this.dialog.open(ConfirmRemoveModalComponent, {
      data: item.name,
      ...confirmRemoveCompanyModal
    });

    dialogRef.afterClosed().subscribe({
      next: (close) => {
        if (close) {
          this.removeGroups(item);
        }
      }
    });
  }

  removeGroups(item: CompanyGroups): void {
    this.companyGroupService.deleteCompanyGroups(item.id).subscribe({
      next: () => {
        this.searchGroups();
        this.notificationsService.success(`${item.name} removido com sucesso!`);
      },
      error: () => this.notificationsService.error('Ops, aconteceu algum problema, tente novamente mais tarde!')
    });
  }

  openEditCompanyModal(item: CompanyGroups): void {
    const editDialog = this.dialog.open(EditGroupComponent, {
      data: item,
      ...editGroupModal
    });

    editDialog.afterClosed().subscribe({
      next: (choice: boolean) => {
        if (choice) {
          this.searchGroups();
        }
      }
    });
  }

  openCompanyDetail(item: CompanyGroup): void {
    const editDialog = this.dialog.open(CompanyDetailComponent, companyDetailModal);
    editDialog.componentInstance.companyGroup = item;
    editDialog.componentInstance.companies = item.companies;
  }

  getCompanyDetail(item: CompanyGroups): void {
    this.isLoading = true;
    this.companyService
      .getGroupById(item.id)
      .subscribe({
        next: (response: CompanyGroup) => this.openCompanyDetail(response)
      })
      .add(() => (this.isLoading = false));
  }
}
