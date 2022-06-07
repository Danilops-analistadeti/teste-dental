import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { companyDetailModal, CompanyGroup, CompanyGroups, CompanyGroupService, ConfirmRemoveModalComponent, CreateCompanyGroupComponent, createCompanyGroupModal } from 'projects/energy-contracting/src/public-api';
import { Observable, of, throwError } from 'rxjs';
import { CompanyDetailComponent } from '../company-detail/company-detail.component';
import { CompanyComponent } from './company.component';
import { confirmRemoveCompanyModal } from './constants/confirm-remove-company-modal.constant';

const companyGroupsMock: CompanyGroups = { name: 'teste', id: 'teste', countCompanies: 0 };

export class MatDialogMock {
  open(): { afterClosed: () => Observable<{ action: boolean }> } {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let companyGroupService: CompanyGroupService;
  let matDialog: MatDialog;
  let notificationsService: NotificationsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyComponent],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock }
      ],
      imports: [
        HttpClientModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    companyGroupService = TestBed.inject(CompanyGroupService);
    matDialog = TestBed.inject(MatDialog);
    notificationsService = TestBed.inject(NotificationsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be fake life cycle on init', () => {
    const searchGroupsSpy = spyOn(component, 'searchGroups').and.stub();

    component.ngOnInit();

    expect(searchGroupsSpy).toHaveBeenCalled();
  });

  it('should be companyGroupService', () => {
    const companyGroups: CompanyGroups[] = [{
      countCompanies: 0,
      name: 'teste'
    }];

    const getCompanyGroupsMock = of(companyGroups);

    const getCompanyGroupsSpy = spyOn(companyGroupService, 'getCompanyGroups').and.returnValue(getCompanyGroupsMock);

    component.searchGroups();

    expect(getCompanyGroupsSpy).toHaveBeenCalled();
    expect(component.companyGroups$).toEqual(getCompanyGroupsMock);
  });

  it('should be open modal create group is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const searchGroupsSpy = spyOn(component, 'searchGroups').and.stub();

    component.openModalCreateGroup();

    expect(openSpy).toHaveBeenCalledWith(CreateCompanyGroupComponent, createCompanyGroupModal);

    expect(searchGroupsSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open modal create group is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const searchGroupsSpy = spyOn(component, 'searchGroups').and.stub();

    component.openModalCreateGroup();

    expect(openSpy).toHaveBeenCalledWith(CreateCompanyGroupComponent, createCompanyGroupModal);

    expect(searchGroupsSpy).not.toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open confirm remove modal is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const removeGroupsSpy = spyOn(component, 'removeGroups').and.stub();

    component.openConfirmRemoveModal(companyGroupsMock);

    expect(openSpy).toHaveBeenCalledWith(ConfirmRemoveModalComponent, {
      ...confirmRemoveCompanyModal,
      data: companyGroupsMock.name
    });

    expect(removeGroupsSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open confirm remove modal is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(false)
    });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const removeGroupsSpy = spyOn(component, 'removeGroups').and.stub();

    component.openConfirmRemoveModal(companyGroupsMock);

    expect(openSpy).toHaveBeenCalledWith(ConfirmRemoveModalComponent, {
      ...confirmRemoveCompanyModal,
      data: companyGroupsMock.name
    });

    expect(removeGroupsSpy).not.toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be success removeGroups', fakeAsync(() => {
    const companyGroup: CompanyGroup = { name: '', companies: [] };

    const deleteCompanyGroupsSpy = spyOn(companyGroupService, 'deleteCompanyGroups').and.returnValue(of(companyGroup));
    const searchGroupsSpy = spyOn(component, 'searchGroups').and.stub();
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.removeGroups(companyGroupsMock);

    flush();

    expect(successSpy).toHaveBeenCalledWith(`${companyGroupsMock.name} removido com sucesso!`);
    expect(searchGroupsSpy).toHaveBeenCalled();
    expect(deleteCompanyGroupsSpy).toHaveBeenCalledWith(companyGroupsMock.id);
  }));

  it('should be error removeGroups', fakeAsync(() => {
    const deleteCompanyGroupsSpy = spyOn(companyGroupService, 'deleteCompanyGroups').and.returnValue(throwError({}));
    const searchGroupsSpy = spyOn(component, 'searchGroups').and.stub();
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.removeGroups(companyGroupsMock);

    expect(errorSpy).toHaveBeenCalledWith('Ops, aconteceu algum problema, tente novamente mais tarde!');
    expect(searchGroupsSpy).not.toHaveBeenCalled();
    expect(deleteCompanyGroupsSpy).toHaveBeenCalledWith(companyGroupsMock.id);
  }));

  it('should be open company detail', () => {
    const openSpy = spyOn(matDialog, 'open').and.stub();

    component.openConfirmRemoveModal(companyGroupsMock);

    expect(openSpy).toHaveBeenCalledWith(CompanyDetailComponent, companyDetailModal);
  });

});
