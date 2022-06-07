import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { QuoteUnavailableComponent } from './quote-unavailable.component';

describe('QuoteUnavailableComponent', () => {
  let component: QuoteUnavailableComponent;
  let fixture: ComponentFixture<QuoteUnavailableComponent>;

  let activatedRoute: ActivatedRoute;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [QuoteUnavailableComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { paramMap: of(convertToParamMap({ id: 1 })) },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteUnavailableComponent);
    component = fixture.componentInstance;

    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be life cycle on init', () => {
    const getStateWithRouteSpy = spyOn(
      component,
      'getStateWithRoute'
    ).and.stub();

    component.ngOnInit();

    expect(getStateWithRouteSpy).toHaveBeenCalled();
  });

  it('should be activated router', () => {
    const testObjectMock = { message: 'teste', subtitle: 'teste' };

    const historySpy = spyOn(window.history, 'pushState').and.stub();

    window.history.pushState(testObjectMock, 'teste', '/quote-unavailable');

    component.getStateWithRoute();

    expect(historySpy).toHaveBeenCalledWith(
      testObjectMock,
      'teste',
      '/quote-unavailable'
    );
  });
});
