import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { of, throwError } from 'rxjs';
import { CompanyGroup } from 'src/app/shared/interfaces/company-group.interface';
import { CompanyGroupService } from 'src/app/shared/services/company-group.service';
import { DualListComponent } from '../dual-list/dual-list.component';
import { CreateCompanyGroupComponent } from './create-company-group.component';

describe('CreateGroupComponent', () => {
  let component: CreateCompanyGroupComponent;
  let fixture: ComponentFixture<CreateCompanyGroupComponent>;
  let formBuilder: FormBuilder;
  let companyGroupService: CompanyGroupService;
  let dialogRef: MatDialogRef<CreateCompanyGroupComponent>;
  let notificationsService: NotificationsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyGroupComponent, DualListComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: (value: boolean): void => { }
          }
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyGroupComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    companyGroupService = TestBed.inject(CompanyGroupService);
    dialogRef = TestBed.inject(MatDialogRef);
    notificationsService = TestBed.inject(NotificationsService);

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

    const groupMock = formBuilder.group({
      name: [],
      companies: []
    });

    const groupSpy = spyOn(formBuilder, 'group').and.returnValue(groupMock);

    component.buildForm();

    expect(groupSpy).toHaveBeenCalled();
    expect(component.createGroupForm).toEqual(groupMock);
  });

  it('should be success create group', () => {
    const companyGroup: CompanyGroup = {
      companies: [],
      name: 'teste'
    };
    component.createGroupForm = formBuilder.group({
      name: new FormControl('teste'),
      companies: new FormControl([{ id: 'teste', name: 'teste' }])
    });

    fixture.detectChanges();

    const createCompanyGroupsSpy = spyOn(companyGroupService, 'createCompanyGroups').and.returnValue(of(companyGroup));
    const closeSpy = spyOn(dialogRef, 'close').and.stub();
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.createGroup();

    expect(createCompanyGroupsSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalledWith(true);
    expect(successSpy).toHaveBeenCalledWith(`${companyGroup.name} criado com sucesso!.`);
  });

  it('should be error create group', () => {

    component.createGroupForm = formBuilder.group({
      name: new FormControl('teste'),
      companies: new FormControl([{ id: 'teste', name: 'teste' }])
    });

    fixture.detectChanges();

    const createCompanyGroupsSpy = spyOn(companyGroupService, 'createCompanyGroups').and.returnValue(throwError({}));
    const closeSpy = spyOn(dialogRef, 'close').and.stub();
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.createGroup();

    expect(createCompanyGroupsSpy).toHaveBeenCalled();
    expect(closeSpy).not.toHaveBeenCalledWith(true);
    expect(errorSpy).toHaveBeenCalled();
  });
});
