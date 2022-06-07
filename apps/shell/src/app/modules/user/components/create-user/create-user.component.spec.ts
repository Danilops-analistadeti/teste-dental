import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { of, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { usersFixture } from '../../fixture/user.fixture';
import { User } from '../../interfaces/user.interface';
import { CreateUserComponent } from './create-user.component';

const matDialogRefStub: Partial<MatDialogRef<CreateUserComponent>> = {
  close(dialogResult?: any) {}
};

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;
  let formBuilder: FormBuilder;
  let userService: UserService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [FormsModule, ReactiveFormsModule, MatSlideToggleModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser(user: User): void {}
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    userService = TestBed.inject(UserService);
    notificationsService = TestBed.inject(NotificationsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildFormSpy).toHaveBeenCalled();
  });

  it('should be buildForm', () => {
    const userFormMock = formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl(''),
      cpf: new FormControl(''),
      isAdmin: new FormControl(true)
    });

    spyOn(formBuilder, 'group').and.returnValue(userFormMock);

    component.buildForm();

    expect(component.createUserForm).toEqual(userFormMock);
  });

  it('should be success createUser', () => {
    const createUserSpy = spyOn(userService, 'createUser').and.returnValue(of(usersFixture[0]));
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.createUser();

    expect(createUserSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });

  it('should be error createUser', () => {
    const createUserSpy = spyOn(userService, 'createUser').and.returnValue(throwError({ error: { message: 'error' } }));
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.createUser();

    expect(createUserSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });
});
