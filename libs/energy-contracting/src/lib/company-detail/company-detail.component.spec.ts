import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyGroup, CompanyGroupService } from 'projects/energy-contracting/src/public-api';
import { of } from 'rxjs';
import { CompanyDetailComponent } from './company-detail.component';

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;
  let companyService: CompanyGroupService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDetailComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    companyService = TestBed.inject(CompanyGroupService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on init', () => {
    const getCompanyDetailSpy = spyOn(component, 'getCompanyDetail').and.stub();

    component.ngOnInit();

    expect(getCompanyDetailSpy).toHaveBeenCalled();
  });

  it('should be get company detail', () => {
    const companyGroupMock: CompanyGroup = {
      companies: [],
      name: 'teste'
    };

    const getGroupByIdSpy = spyOn(companyService, 'getGroupById').and.returnValue(of(companyGroupMock));
    component.getCompanyDetail();

    expect(getGroupByIdSpy).toHaveBeenCalled();
    expect(component.companyGroup).toEqual(companyGroupMock);
    expect(component.companies).toEqual(companyGroupMock.companies);
    expect(component.isLoading).toBeFalse();
  });
});
