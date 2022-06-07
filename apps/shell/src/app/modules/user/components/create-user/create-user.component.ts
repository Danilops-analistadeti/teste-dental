import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'ec-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  createUserForm: FormGroup;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.createUserForm = this.formBuilder.group({
      person: this.formBuilder.group({
        name: new FormControl(''),
        cpf: new FormControl(''),
        phone: new FormControl(''),
      }),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      isAdmin: new FormControl(true)
    });
  }

  createUser(): void {
    this.isLoading = true;
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (user: User) => {
        this.notificationsService.success(`Usuário ${user?.person.name} criado com sucesso`);
        this.dialogRef.close(true);
      },
      error: ({ error }) => this.notificationsService.error(error.message)
    }).add(() => this.isLoading = false);
  }
}
