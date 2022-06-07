import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { NgxsModule } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { usersFixture } from '../../fixture/user.fixture';
import { User } from '../../interfaces/user.interface';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let formBuilder: FormBuilder;
  let userService: UserService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgxsModule.forRoot()
      ],
      providers: [
        {
          provide: UserService, useValue: {
            editUser(user: User): void { }
          },
        },
        {
          provide: MatDialogRef, useValue: {
            close: (value: boolean): void => { }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    userService = TestBed.inject(UserService);
    notificationsService = TestBed.inject(NotificationsService)
    component.data = usersFixture[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnit', () => {
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

    expect(component.editUserForm).toEqual(userFormMock);
  });

  it('should be success editUser', () => {
    const editUserSpy = spyOn(userService, 'editUser').and.returnValue(of(usersFixture[0]))
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.editUser();

    expect(editUserSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  it('should be error editUser', () => {
    const editUserSpy = spyOn(userService, 'editUser').and.returnValue(throwError({ error: { message: 'error' } }))
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.editUser();

    expect(editUserSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });
});
