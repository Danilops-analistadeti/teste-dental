import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentsService, MultiselectModule } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { of, throwError } from 'rxjs';
import { PreRegistration } from '../../interfaces/pre-registration.interface';
import { PreRegistrationService } from '../../services/pre-registration.service';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let formBuilder: FormBuilder;
  let preRegistrationService: PreRegistrationService;
  let notificationsService: NotificationsService;
  let agentsService: AgentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, MultiselectModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    preRegistrationService = TestBed.inject(PreRegistrationService);
    notificationsService = TestBed.inject(NotificationsService);
    agentsService = TestBed.inject(AgentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on init', () => {
    const buildSpy = spyOn(component, 'buildForm').and.stub();

    component.ngOnInit();

    expect(buildSpy).toHaveBeenCalled();
  });

  it('should be build form', () => {
    const fomGroupMock = formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      phone: new FormControl(null),
      agents: new FormControl(null, Validators.required)
    });

    spyOn(formBuilder, 'group').and.returnValue(fomGroupMock);

    component.buildForm();

    expect(component.registrationForm).toEqual(fomGroupMock);
  });

  it('should be success register', () => {
    const preRegistrationMock: PreRegistration = {
      agents: [],
      email: '',
      name: '',
      phone: ''
    };

    component.registrationForm = formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      agents: new FormControl([])
    });

    const preRegistroSpy = spyOn(preRegistrationService, 'preRegistration').and.returnValue(of(preRegistrationMock));
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.onSubmit();

    expect(preRegistroSpy).toHaveBeenCalled();
    expect(component.loading.submit).toBeFalse();
    expect(successSpy).toHaveBeenCalled();
  });

  it('should be error register', () => {
    const preRegistrationMock: PreRegistration = {
      agents: [],
      email: '',
      name: '',
      phone: ''
    };

    component.registrationForm = formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      agents: new FormControl([])
    });

    const preRegistroSpy = spyOn(preRegistrationService, 'preRegistration').and.returnValue(
      throwError(preRegistrationMock)
    );
    const successSpy = spyOn(notificationsService, 'error').and.stub();

    component.onSubmit();

    expect(preRegistroSpy).toHaveBeenCalled();
    expect(component.loading.submit).toBeFalse();
    expect(successSpy).toHaveBeenCalled();
  });

  it('should be change agents with value', () => {
    const value = 'teste';
    const agentsMock: Agents[] = [
      {
        cnpj: '1342',
        id: '1',
        name: 'teste'
      }
    ];

    const getAgentsCCESpy = spyOn(agentsService, 'getAgentsCCEE').and.returnValue(of(agentsMock));

    component.changeAgents(value);

    expect(component.agentsData).toEqual(agentsMock);
    expect(getAgentsCCESpy).toHaveBeenCalled();
    expect(component.loading.getAgents).toBeFalse();
  });

  it('should be change agents not value', () => {
    const getAgentsCCESpy = spyOn(agentsService, 'getAgentsCCEE').and.returnValue(of());

    component.changeAgents();

    expect(getAgentsCCESpy).not.toHaveBeenCalled();
  });

  it('should be change error get agents', () => {
    const value = 'teste';

    const agentsMock: Agents = { cnpj: '', name: '', id: '' };
    const getAgentsCCESpy = spyOn(agentsService, 'getAgentsCCEE').and.returnValue(throwError(agentsMock));
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.changeAgents(value);

    expect(getAgentsCCESpy).toHaveBeenCalled();
    expect(component.loading.getAgents).toBeFalse();
    expect(errorSpy).toHaveBeenCalled();
  });
});
