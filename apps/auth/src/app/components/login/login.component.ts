import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authenticate, Authentication, AuthService } from '@auth-lib';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Store } from '@ngxs/store';

@Component({
  selector: 'ec-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;
  hide = true;
  text = 'mostrar';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      application: ['ENERGY_CONTRACTING']
    });
  }

  login(): void {
    this.isLoading = true;

    this.authService
      .authenticate(this.loginForm.value)
      .subscribe({
        next: (response) => this.successAutenticate(response),
        error: ({ status }) => this.errorAutenticate(status)
      })
      .add(() => (this.isLoading = false));
  }

  errorAutenticate(status: string): void {
    if (status) {
      this.notificationService.error('Usuário ou senha inválido');
    } else {
      this.notificationService.error('Ops, aconteceu algum problema, tente novamente mais tarde!');
    }
  }

  successAutenticate(auth: Authentication): void {
    this.store.dispatch(new Authenticate(auth)).subscribe({
      next: () => {
        this.notificationService.clearAll();
        this.router.navigateByUrl('/');
      }
    });
  }

  hasError(formControl: AbstractControl, errorName: string): boolean {
    return formControl.touched && formControl.hasError(errorName);
  }

  togglePassword(): void {
    this.hide = !this.hide;
    this.text = this.hide ? 'mostrar' : 'ocultar';
  }
}
