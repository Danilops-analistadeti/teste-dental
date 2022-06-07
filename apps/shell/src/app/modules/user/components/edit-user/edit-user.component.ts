import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthState } from '@auth-lib';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'ec-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  isLoading = false;
  editUserForm!: FormGroup;

  localUser: User;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private store: Store
  ) {
    this.localUser = this.store.selectSnapshot(AuthState);
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const { name, phone, cpf } = this.data?.person;

    this.editUserForm = this.formBuilder.group({
      person: this.formBuilder.group({
        name: new FormControl(name),
        phone: new FormControl(phone),
        cpf: new FormControl(cpf)
      }),
      email: new FormControl(
        { value: this.data?.email, disabled: true },
        Validators.compose([Validators.required, Validators.email])
      ),
      isAdmin: new FormControl({
        value: this.data?.isAdmin,
        disabled: this.data?.isAdmin
      })
    });
  }

  editUser(): void {
    this.isLoading = true;
    this.userService
      .editUser(this.editUserForm.value, this.data.id)
      .subscribe({
        next: (user: User) => {
          this.notificationsService.success(`Usuário ${user?.person?.name} alterado com sucesso`);
          this.dialogRef.close(true);
        },
        error: ({ error }) => this.notificationsService.error(error.message)
      })
      .add(() => (this.isLoading = false));
  }
}
