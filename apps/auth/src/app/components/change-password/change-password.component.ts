import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Authenticate, AuthService, Logout } from '@auth-lib';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { environment } from 'environments/environment';
import { ChangePasswordLgpd } from 'libs/auth-lib/src/lib/interfaces/change-password.interface';
import { mustMatch } from '../../validators/must-match.validator';

@Component({
  selector: 'ec-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  token: string;
  hide = true;
  isNewUser = false;
  isLoading = false;
  isTokenValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private service: AuthService,
    private store: Store,
    private notifyService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.tokenVerify();
    this.isNewUser = this.activatedRoute.snapshot?.url[0]?.path === 'confirm-user';
    this.store.dispatch(Logout);
  }

  buildForm(): void {
    this.form = this.formBuilder.group(
      {
        passwordConfirmation: ['', Validators.required],
        password: ['', Validators.required],
        acceptTermsOfUse: ['']
      },
      { validator: mustMatch('password', 'passwordConfirmation') }
    );
  }

  onSubmit(): void {
    this.isLoading = true;

    this.store.dispatch(new Authenticate({ token: this.token })).subscribe({
      next: () => this.changePassword(),
      error: () => {
        this.notifyService.error('Não foi possível alterar a senha!');
        this.isLoading = false;
      }
    });
  }

  changePassword(): void {
    this.service
      .changePassword(this.getParamsLgpd())
      .subscribe({
        next: () => {
          const message = `Senha ${this.isNewUser ? 'cadastrada' : 'atualizada'} com sucesso!`;
          this.notifyService.success(message);
          this.router.navigate(['/auth']);
        }
      })
      .add(() => (this.isLoading = false));
  }

  getParamsLgpd(): ChangePasswordLgpd {
    return {
      password: this.form.get('password').value,
      contracts: ['privacy-contract']
    }
  }

  hasError(control: string, error: string): boolean {
    return this.form.get(control)?.touched && this.form.get(control).hasError(error);
  }

  tokenVerify(): void {
    this.token = this.activatedRoute.snapshot?.queryParams?.token;
    if (this.token) {
      this.isTokenValid = this.service.tokenVerify(this.token);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  openDocuments(): void {
    window.open(`${environment.LGPD_TERMS_OF_USE_PDF}`);
    window.open(`${environment.LGPD_CONFIDENTIALITY_PDF}`);
  }
}
