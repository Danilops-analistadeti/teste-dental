import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Authenticate, Authentication, AuthService } from '@auth-lib';
import { ActivatedRouteStub } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { NgxsModule, Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import { GENERIC_ERROR_MESSAGE } from './constants/generic-error-message.constant';
import { WRONG_PASSWORD_MESSAGE } from './constants/wrong-password-message.constant';
import { RedirectHudComponent } from './redirect-hud.component';

describe('RedirectHudComponent', () => {
  let component: RedirectHudComponent;
  let fixture: ComponentFixture<RedirectHudComponent>;
  let store: Store;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let authService: AuthService;
  let notification: NotificationsService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RedirectHudComponent],
        imports: [HttpClientTestingModule, NgxsModule.forRoot(), RouterTestingModule, NoopAnimationsModule],
        providers: [
          {
            provide: ActivatedRoute,
            useClass: ActivatedRouteStub
          },
          {
            provide: AuthService,
            useValue: {
              authenticateTokenHud: (token: string) => of()
            }
          },
          {
            provide: NotificationsService,
            useValue: {
              error: (msg: string) => null,
              clearAll: () => null
            }
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectHudComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    authService = TestBed.inject(AuthService);
    notification = TestBed.inject(NotificationsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be on init', () => {
    const initRedirectSpy = jest.spyOn(component, 'initRedirect').mockImplementation();

    component.ngOnInit();

    expect(initRedirectSpy).toHaveBeenCalled();
  });

  it('should be initRedirect', () => {
    const token = 'test';
    const paramMap = {
      get: (name: string) => token
    } as ParamMap;

    const paramMapSpy = jest.spyOn(activatedRoute, 'paramMap', 'get').mockReturnValue(of(paramMap));
    const navigateSpy = jest.spyOn(router, 'navigate');
    const loginSpy = jest.spyOn(component, 'login');
    const setLoadingSpy = jest.spyOn(component, 'initLoadAnimation');

    component.initRedirect();

    expect(paramMapSpy).toBeCalled();
    expect(navigateSpy).toBeCalledWith([], { replaceUrl: true });
    expect(loginSpy).toBeCalledWith(token);
    expect(setLoadingSpy).toBeCalled();
  });

  it('should be login', () => {
    const token = '1234567';
    const authentication = {
      token,
      name: 'test'
    } as Authentication;

    component.isLoading = true;

    const authenticateTokenHudSpy = jest.spyOn(authService, 'authenticateTokenHud').mockReturnValue(of(authentication));
    const successAuthenticateSpy = jest.spyOn(component, 'successAuthenticate').mockImplementation();

    component.login(token);

    expect(authenticateTokenHudSpy).toBeCalledWith(token);
    expect(successAuthenticateSpy).toBeCalledWith(authentication);
    expect(component.isLoading).toBeFalsy();
  });

  it('should be login with error', () => {
    const token = '1234567';
    const status = '500';

    component.isLoading = true;

    const authenticateTokenHudSpy = jest
      .spyOn(authService, 'authenticateTokenHud')
      .mockReturnValue(throwError({ status }));
    const successAuthenticateSpy = jest.spyOn(component, 'successAuthenticate').mockImplementation();
    const errorAuthenticateSpy = jest.spyOn(component, 'errorAuthenticate').mockImplementation();

    component.login(token);

    expect(authenticateTokenHudSpy).toBeCalledWith(token);
    expect(successAuthenticateSpy).not.toBeCalled();
    expect(errorAuthenticateSpy).toBeCalledWith(status);
    expect(component.isLoading).toBeFalsy();
  });

  it('should be errorAuthenticate with status', () => {
    const errorSpy = jest.spyOn(notification, 'error').mockImplementation();

    component.errorAuthenticate('test');

    expect(errorSpy).toBeCalledWith(WRONG_PASSWORD_MESSAGE);
  });

  it('should be errorAuthenticate without status', () => {
    const errorSpy = jest.spyOn(notification, 'error').mockImplementation();

    component.errorAuthenticate('');

    expect(errorSpy).toBeCalledWith(GENERIC_ERROR_MESSAGE);
  });

  it('should be successAuthenticate', () => {
    const auth = {
      id: '1',
      name: 'test'
    } as Authentication;

    const dispatchSpy = jest.spyOn(store, 'dispatch').mockReturnValue(of({}));
    const clearAllSpy = jest.spyOn(notification, 'clearAll').mockImplementation();
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl').mockImplementation();

    component.successAuthenticate(auth);

    expect(dispatchSpy).toBeCalledWith(new Authenticate(auth));
    expect(clearAllSpy).toBeCalled();
    expect(navigateByUrlSpy).toBeCalledWith('/quotation/create-quotation');
  });

  it('should be setLoading', fakeAsync(() => {
    component.loadingPoints = '..';
    component.initLoadAnimation();

    tick(500);

    expect(component.loadingPoints).toEqual('...');

    discardPeriodicTasks();
  }));

  it('should be ngOnDestroy', () => {
    const unsubscribeSpy = jest.spyOn(component, 'unsubscribeTimer').mockImplementation();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toBeCalled();
  });

  it('should be unsubscribeTimer', () => {
    component.timerSubscription = of(1).subscribe();

    const unsubscribeSpy = jest.spyOn(component.timerSubscription, 'unsubscribe').mockImplementation();

    component.unsubscribeTimer();

    expect(unsubscribeSpy).toBeCalled();
  });
});
