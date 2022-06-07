import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticService } from '@energy-contracting';
import { LoggedAreaComponent } from './logged-area.component';

describe('LoggedAreaComponent', () => {
  let component: LoggedAreaComponent;
  let fixture: ComponentFixture<LoggedAreaComponent>;
  let analyticService: AnalyticService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoggedAreaComponent],
      providers: [
        {
          provide: AnalyticService,
          useValue: {
            init: (): void => null
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedAreaComponent);
    component = fixture.componentInstance;
    analyticService = TestBed.inject(AnalyticService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const initSpy = jest.spyOn(analyticService, 'init');

    component.ngOnInit();

    expect(initSpy).toHaveBeenCalled();
  });
});
