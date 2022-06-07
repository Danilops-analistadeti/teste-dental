import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let formBuilder: FormBuilder;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          NgxsModule.forRoot(),
          RouterTestingModule,
          MatFormFieldModule,
          MatInputModule,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on init', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
  });

  it('should be buildForm', () => {
    const loginFormMock = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      application: ['ENERGY_CONTRACTING'],
    });

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(loginFormMock);

    component.buildForm();

    expect(component.loginForm).toEqual(loginFormMock);
    expect(groupSpy).toHaveBeenCalled();
  });

  it('should be redirect login success', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.returnValue(of({}));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.stub();

    component.login();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('/quotation');
  });
});
