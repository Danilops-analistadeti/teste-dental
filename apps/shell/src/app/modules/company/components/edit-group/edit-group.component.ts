import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyGroup, CompanyGroups, CompanyGroupService } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';

@Component({
  selector: 'ec-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditGroupComponent implements OnInit {
  companyGroup: CompanyGroup;
  editGroupForm: FormGroup;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private companyGroupService: CompanyGroupService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<EditGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyGroups
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getGroupById();
  }

  buildForm(): void {
    this.editGroupForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      companies: new FormControl(null, Validators.required),
      id: new FormControl()
    });
  }

  getGroupById(): void {
    this.isLoading = true;
    this.companyGroupService
      .getGroupById(this.data.id)
      .subscribe({
        next: (response) => {
          this.companyGroup = response;
          this.editGroupForm.patchValue(response);
        },
        error: (err) => {
          this.notificationsService.error(err?.error?.message);
          this.dialogRef.close();
        }
      })
      .add(() => (this.isLoading = false));
  }

  editGroup(): void {
    this.isLoading = true;
    const { name, companies, id } = this.editGroupForm.value;
    const idCompanies = companies.map((e: CompanyGroups) => e.id);

    this.companyGroupService
      .putCompanyGroups({ name, companies: idCompanies }, id)
      .subscribe({
        next: () => {
          this.notificationsService.success(`${name} editado com sucesso!.`);
          this.dialogRef.close(true);
        },
        error: (err) => this.notificationsService.error(err?.error?.message)
      })
      .add(() => (this.isLoading = false));
  }
}
