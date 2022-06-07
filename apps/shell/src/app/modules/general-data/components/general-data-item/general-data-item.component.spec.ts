import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxMaskModule } from 'ngx-mask';
import { Feature } from '../../interfaces/feature.interface';
import { GeneralDataItemComponent } from './general-data-item.component';

fdescribe('GeneralDataItemComponent', () => {
  let component: GeneralDataItemComponent;
  let fixture: ComponentFixture<GeneralDataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralDataItemComponent],
      imports: [NgxMaskModule.forRoot()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return id', () => {
    const id = '8e398e5d-ecee-4496-93fc-d2bec9876073';
    const featureMock: Feature = {
      id,
      alias: 'test',
      name: 'test'
    };

    const returnedId = component.trackByFn(featureMock);

    expect(returnedId).toEqual(id);
  });
});
