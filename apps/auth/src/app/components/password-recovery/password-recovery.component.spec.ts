import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { AuthService } from 'projects/auth/src/public-api';
import { Observable, of } from 'rxjs';
import { PasswordRecoveryComponent } from './password-recovery.component';

const serviceStub: Partial<AuthService> = {
  sendRecoveryEmail(email: string): Observable<boolean> {
    return of(true);
  },
};

describe('PasswordRecoveryComponent', () => {
  let component: PasswordRecoveryComponent;
  let fixture: ComponentFixture<PasswordRecoveryComponent>;

  let formBuilder: FormBuilder;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRecoveryComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{ path: 'auth', redirectTo: '' }]),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgxsModule.forRoot(),
      ],
      providers: [{ provide: AuthService, useValue: serviceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);
    service = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be lifecycle on init', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
  });

  it('should build form group', () => {
    const form = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(form);

    component.buildForm();

    expect(groupSpy).toHaveBeenCalled();
    expect(component.form).toEqual(form);
  });

  it('should send recovery email and set true in sentEmail variable', () => {
    const email = 'teste@email.com';
    component.form = formBuilder.group({
      email: [email],
    });

    const sendRecoveryEmailSpy = spyOn(
      service,
      'sendRecoveryEmail'
    ).and.returnValue(of(true));

    component.onSubmit();

    expect(sendRecoveryEmailSpy).toHaveBeenCalledWith(email);
    expect(component.sentEmail).toBeTrue();
  });
});
