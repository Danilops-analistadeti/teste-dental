import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Client, ClientsService, CreateBillingInfoComponent, createBillingInfoModal, Pagination } from 'projects/energy-contracting/src/public-api';
import { Observable, of } from 'rxjs';
import { BillingInfoComponent } from './billing-info.component';

const getClients = (name?: string, pagination?: Pagination) => of();

class MatDialogMock {
  open(): { afterClosed: () => Observable<{ action: boolean }> } {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('BillingInfoComponent', () => {
  let component: BillingInfoComponent;
  let fixture: ComponentFixture<BillingInfoComponent>;
  let clientsService: ClientsService;
  let matDialog: MatDialog;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BillingInfoComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            getClients
          }
        },
        { provide: MatDialog, useClass: MatDialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingInfoComponent);
    component = fixture.componentInstance;
    clientsService = TestBed.inject(ClientsService);
    matDialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const loadSpy = spyOn(component, 'load').and.stub();

    component.ngOnInit();

    expect(loadSpy).toHaveBeenCalled();
  });

  it('should be load with page', () => {
    const client: Client[] = [
      {
        id: '',
        name: ''
      }
    ];

    const page = 1;
    const getClientsSpy = spyOn(clientsService, 'getClients').and.returnValue(of(client));

    component.load(null, page);

    expect(getClientsSpy).toHaveBeenCalled();
    expect(component.subscription).toBeDefined();
    expect(component.page).toEqual(page);
    expect(component.dataSource).toEqual(client);
  });

  it('should be open create billing info modal is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(true)
    });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const loadSpy = spyOn(component, 'load').and.stub();

    component.openBillingInfoModal();

    expect(openSpy).toHaveBeenCalledWith(CreateBillingInfoComponent, createBillingInfoModal);
    expect(loadSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open create billing info modal is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(false)
    });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const loadSpy = spyOn(component, 'load').and.stub();

    component.openBillingInfoModal();

    expect(openSpy).toHaveBeenCalledWith(CreateBillingInfoComponent, createBillingInfoModal);
    expect(loadSpy).not.toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });


});
