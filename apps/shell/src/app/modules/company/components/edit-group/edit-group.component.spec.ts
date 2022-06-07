import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyGroup, CompanyGroups, CompanyGroupService, DualListComponent } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { of, throwError } from 'rxjs';
import { EditGroupComponent } from './edit-group.component';

describe('EditGroupComponent', () => {
  let component: EditGroupComponent;
  let fixture: ComponentFixture<EditGroupComponent>;

  let formBuilder: FormBuilder;
  let companyGroupService: CompanyGroupService;
  let notificationsService: NotificationsService;
  let dialogRef: MatDialogRef<EditGroupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditGroupComponent, DualListComponent],
        imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
        providers: [
          {
            provide: MatDialogRef,
            useValue: {
              close: (value: boolean): void => {}
            }
          },
          { provide: MAT_DIALOG_DATA, useValue: {} }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGroupComponent);
    component = fixture.componentInstance;

    formBuilder = TestBed.inject(FormBuilder);
    companyGroupService = TestBed.inject(CompanyGroupService);
    notificationsService = TestBed.inject(NotificationsService);
    dialogRef = TestBed.inject(MatDialogRef);
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
    expect(component.editGroupForm).toEqual(groupMock);
  });

  it('should be success editGroup', () => {
    const putCompanyGroups: CompanyGroup = {
      companies: [],
      name: 'teste'
    };

    const putCompanyGroupsSpy = spyOn(companyGroupService, 'putCompanyGroups').and.returnValue(of(putCompanyGroups));
    const successSpy = spyOn(notificationsService, 'success').and.stub();
    const closeSpy = spyOn(dialogRef, 'close').and.stub();

    component.editGroupForm = formBuilder.group({
      name: new FormControl(),
      companies: new FormControl([])
    });

    component.editGroup();

    expect(putCompanyGroupsSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('should be success getGroupById', () => {
    const companyGroupMock: CompanyGroup = { companies: [{ fantasyName: '', id: '', name: '' }], name: 'teste' };
    const getGroupByIdSpy = spyOn(companyGroupService, 'getGroupById').and.returnValue(of(companyGroupMock));

    component.editGroupForm = formBuilder.group({
      name: new FormControl(),
      companies: new FormControl([])
    });

    component.getGroupById();

    expect(getGroupByIdSpy).toHaveBeenCalled();
    expect(component.companyGroup).toEqual(companyGroupMock);
    expect(component.isLoading).toBeFalsy();
    expect(component.editGroupForm.value).toEqual(companyGroupMock);
  });

  it('should be error getGroupById', () => {
    const getGroupByIdSpy = spyOn(companyGroupService, 'getGroupById').and.returnValue(throwError({}));
    const closeSpy = spyOn(dialogRef, 'close').and.stub();
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.getGroupById();

    expect(getGroupByIdSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
    expect(errorSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should be error editGroup', () => {
    const putCompanyGroupsSpy = spyOn(companyGroupService, 'putCompanyGroups').and.returnValue(throwError({}));
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    const companyGroups: CompanyGroups[] = [{ name: 'teste', countCompanies: 0 }];

    component.editGroupForm = formBuilder.group({
      name: new FormControl(''),
      companies: new FormControl(companyGroups)
    });

    component.editGroup();

    expect(putCompanyGroupsSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
