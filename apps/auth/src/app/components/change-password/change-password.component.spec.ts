import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@auth';
import { EsferaNotificationsModule } from '@esferaenergia/esfera-ui';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { NgxsModule, Store } from '@ngxs/store';
import { StateOverwrite } from 'ngxs-reset-plugin';
import { AuthState } from 'projects/auth/src/lib/state/auth.state';
import { AuthService, Logout } from 'projects/auth/src/public-api';
import { ActivatedRouterStub } from 'projects/energy-contracting/src/public-api';
import { Observable, of, throwError } from 'rxjs';
import { Authentication } from '../../../../../../projects/auth/src/lib/interfaces/authentication.interface';
import { mustMatch } from '../../validators/must-match.validator';
import { ChangePasswordComponent } from './change-password.component';

@Injectable()
class ActivatedRouterMock extends ActivatedRouterStub {
  snapshot: {
    queryParams: Record<string, unknown>;
    url: [{ path: 'confirm-user' }];
  };
}

@Injectable()
class ServiceStub {
  tokenVerify = (token: string): boolean => true;
  changePassword = (password: string): Observable<Authentication> => of();
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let formBuilder: FormBuilder;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let service: AuthService;
  let store: Store;
  let notifyService: NotificationsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangePasswordComponent],
        imports: [
          NoopAnimationsModule,
          FormsModule,
          ReactiveFormsModule,
          RouterTestingModule.withRoutes([{ path: 'auth', redirectTo: '' }]),
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          NgxsModule.forRoot(),
          EsferaNotificationsModule,
        ],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouterMock },
          { provide: AuthService, useClass: ServiceStub },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(AuthService);
    store = TestBed.inject(Store);
    notifyService = TestBed.inject(NotificationsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do lifecycle on init', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();
    const tokenVerifySpy = spyOn(component, 'tokenVerify').and.stub();
    const dispatchSpy = spyOn(store, 'dispatch').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
    expect(tokenVerifySpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(Logout);
  });

  it('should build form group', () => {
    const formMock = formBuilder.group(
      {
        passwordConfirmation: ['', Validators.required],
        password: ['', Validators.required],
        acceptTermsOfUse: ['']
      },
      {
        validator: mustMatch('password', 'passwordConfirmation'),
      }
    );

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(formMock);

    component.buildForm();

    expect(component.form).toEqual(formMock);
    expect(groupSpy).toHaveBeenCalled();
  });

  describe('onSubmit', () => {
    it('should be change password', () => {
      component.token = 'f4a9721a-c44b-4441-b7f5-c6e652321fda';
      const authToken = {
        roles: [
          {
            token: component.token,
          },
        ],
      };

      const dispatchSpy = spyOn(store, 'dispatch').and.returnValue(of({}));
      const changePasswordSpy = spyOn(component, 'changePassword').and.stub();

      component.onSubmit();

      expect(component.isLoading).toBeTrue();
      expect(dispatchSpy).toHaveBeenCalledWith(
        new StateOverwrite([AuthState, authToken])
      );
      expect(changePasswordSpy).toHaveBeenCalled();
    });

    it('should be dont change and push error notification', () => {
      component.token = 'f4a9721a-c44b-4441-b7f5-c6e652321fda';
      const authToken = {
        roles: [
          {
            token: component.token,
          },
        ],
      };

      const dispatchSpy = spyOn(store, 'dispatch').and.returnValue(
        throwError('')
      );
      const errorSpy = spyOn(notifyService, 'error').and.stub();

      component.onSubmit();

      expect(dispatchSpy).toHaveBeenCalledWith(
        new StateOverwrite([AuthState, authToken])
      );
      expect(errorSpy).toHaveBeenCalledWith(
        'Não foi possível alterar a senha!'
      );
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('hasError', () => {
    it('should return true', () => {
      const control = 'name';
      component.form = formBuilder.group({
        name: [],
      });

      component.form.get(control).markAsTouched();
      component.form.get(control).setErrors({
        required: true,
      });

      const result = component.hasError('name', 'required');

      expect(result).toBeTrue();
    });

    it('should return false', () => {
      const control = 'name';
      component.form = formBuilder.group({
        name: [],
      });

      component.form.get(control).markAsTouched();

      const result = component.hasError('name', 'required');

      expect(result).toBeFalse();
    });

    it('should return false when not touched', () => {
      const control = 'name';
      component.form = formBuilder.group({
        name: [],
      });

      component.form.get(control).setErrors({
        required: true,
      });

      const result = component.hasError('name', 'required');

      expect(result).toBeFalse();
    });
  });

  describe('tokenVerify', () => {
    it('should call tokenVerify of auth service', () => {
      activatedRoute.snapshot = new ActivatedRouteSnapshot();
      activatedRoute.snapshot.queryParams = {
        token: '741554be-2288-4814-9180-6518009709a4',
      };

      const tokenVerifySpy = spyOn(service, 'tokenVerify').and.stub();

      component.tokenVerify();

      expect(tokenVerifySpy).toHaveBeenCalled();
    });

    it('should call navigate of router', () => {
      activatedRoute.snapshot = new ActivatedRouteSnapshot();
      activatedRoute.snapshot.queryParams = {
        token: undefined,
      };

      const navigateSpy = spyOn(router, 'navigate').and.stub();

      component.tokenVerify();

      expect(navigateSpy).toHaveBeenCalledWith(['/auth']);
    });
  });

  it('should call changePassword of service', () => {
    const email = 'test@email.com';
    const password = 'test';

    const returnValue: Authentication = {
      email,
      id: '',
      name: '',
      roles: [],
    };

    component.form = formBuilder.group({
      password,
    });

    const changePasswordSpy = spyOn(service, 'changePassword').and.returnValue(
      of(returnValue)
    );

    component.changePassword();

    expect(changePasswordSpy).toHaveBeenCalledWith(password);
  });

  it('open documents in new tab', () => {
    const openSpy = jest.spyOn(window, 'open');

    component.openDocuments();

    expect(openSpy).toHaveBeenCalledWith(environment.LGPD_CONFIDENTIALITY_PDF);
    expect(openSpy).toHaveBeenCalledWith(environment.LGPD_TERMS_OF_USE_PDF);

    openSpy.mockRestore();
  });

  it('get params lgpd', () => {
    component.form = formBuilder.group(
      {
        passwordConfirmation: ['123', Validators.required],
        password: ['123', Validators.required],
        acceptTermsOfUse: ['']
      },
      {
        validator: mustMatch('password', 'passwordConfirmation'),
      }
    );

    const params = component.getParamsLgpd();

    expect(params).toEqual({
      password: '123',
      contracts: ['privacy-contract']
    });
  });
});
