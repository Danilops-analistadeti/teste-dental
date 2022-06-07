import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth-lib';

@Component({
  selector: 'ec-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordRecoveryComponent implements OnInit {
  sentEmail = false;
  isLoading = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService
      .sendRecoveryEmail(this.form.get('email').value)
      .subscribe({
        next: () => (this.sentEmail = true)
      })
      .add(() => (this.isLoading = false));
  }
}
