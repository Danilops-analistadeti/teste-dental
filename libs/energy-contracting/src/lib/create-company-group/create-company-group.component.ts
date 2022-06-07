import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { CompanyGroups } from '../interfaces/company-groups.interface';
import { CompanyGroupService } from '../services/company-group.service';

@Component({
  selector: 'ec-create-group',
  templateUrl: './create-company-group.component.html',
  styleUrls: ['./create-company-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CreateCompanyGroupComponent implements OnInit {
  createGroupForm: FormGroup;
  currentPage: 1;
  itemsPerPage: 10;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private companyGroupService: CompanyGroupService,
    private notification: NotificationsService,
    public dialogRef: MatDialogRef<CreateCompanyGroupComponent>
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.createGroupForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      companies: new FormControl(null, Validators.required)
    });
  }

  createGroup(): void {
    const { name, companies } = this.createGroupForm.value;
    const idCompanies = companies.map((e: CompanyGroups) => e.id);

    this.companyGroupService.createCompanyGroups({ name, companies: idCompanies }).subscribe({
      next: () => {
        this.notification.success(`${name} criado com sucesso!.`);
        this.dialogRef.close(true);
      },
      error: (err) => this.notification.error(err?.error?.message)
    });
  }
}
