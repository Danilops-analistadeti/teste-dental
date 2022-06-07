import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { GeneralDataComponent } from './general-data.component';
import { GeneralData } from './interfaces/general-data.interface';
import { GeneralDataService } from './services/general-data.service';

fdescribe('GeneralDataComponent', () => {
  let component: GeneralDataComponent;
  let fixture: ComponentFixture<GeneralDataComponent>;
  let service: GeneralDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralDataComponent],
      imports: [HttpClientTestingModule],
      providers: [GeneralDataService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GeneralDataService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load in oninit', () => {
    const loadSpy = spyOn(component, 'load').and.stub();

    component.ngOnInit();

    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return general data', () => {
    const generalData: GeneralData = {
      id: '379e9d2d-3bea-43cf-8727-4507cb0381d6',
      name: 'test',
      cnpj: '123456789',
      fantasyName: 'test fantasy',
      features: [
        {
          id: 'cfd35643-0e51-4e1c-8104-b5356848f83f',
          name: 'test',
          alias: 'TEST'
        }
      ]
    };

    const getGeneralDataSpy = spyOn(service, 'getGeneralData').and.returnValue(of(generalData));

    component.load();

    expect(getGeneralDataSpy).toHaveBeenCalled();
    expect(component.generalData).toEqual(generalData);
  });

  it('should unsubscribe in ondestroy', () => {
    component.subscription = new Subscription();

    const unsubscribeSpy = spyOn(component.subscription, 'unsubscribe').and.stub();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
