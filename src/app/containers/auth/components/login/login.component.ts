import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  showPassword = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formBuild();
  }

  formBuild(): void {
    this.form = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const username = this.form.value.username;

    timer(1000).subscribe({
      next: () => {
        this.setLocalStorage('username', username);
        this.redirectHome();
      }
    })
  }

  setLocalStorage(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  redirectHome(): void {
    this.router.navigate(['/home/list']);
  }

}
