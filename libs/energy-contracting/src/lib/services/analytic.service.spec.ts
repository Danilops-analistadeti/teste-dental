import { Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../environments/environment';
import { ANALYTICS_ID } from '../constants/analytics-id.constant';
import { TAG_MANAGER_ID } from '../constants/tag-manager-id.constant';
import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  let service: AnalyticService;
  let renderer: Renderer2;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Renderer2,
          useValue: {
            createElement: () => null,
            setAttribute: () => null,
            appendChild: () => null,
            setStyle: () => null,
            insertBefore: () => null
          }
        },
        {
          provide: Document,
          useValue: {
            head: {},
            body: {
              firstChild: {}
            }
          }
        }
      ]
    });
    service = TestBed.inject(AnalyticService);
    renderer = TestBed.inject(Renderer2);
    service['renderer'] = renderer;
    document = TestBed.inject(Document);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be init', () => {
    const insertTagManagerScriptSpy = jest.spyOn(service, 'insertTagManagerScript').mockImplementation(() => null);
    const insertTagManagerFrameSpy = jest.spyOn(service, 'insertTagManagerFrame').mockImplementation(() => null);
    const makeAnalyticsImportScriptSpy = jest
      .spyOn(service, 'insertAnalyticImportScript')
      .mockImplementation(() => null);
    const makeAnalyticsScriptSpy = jest.spyOn(service, 'insertAnalyticScript').mockImplementation(() => null);

    service.init();

    expect(insertTagManagerScriptSpy).toHaveBeenCalled();
    expect(insertTagManagerFrameSpy).toHaveBeenCalled();
    expect(makeAnalyticsImportScriptSpy).toHaveBeenCalled();
    expect(makeAnalyticsScriptSpy).toHaveBeenCalled();
  });

  it('should be init when has Analytics', () => {
    const insertTagManagerScriptSpy = jest.spyOn(service, 'insertTagManagerScript').mockImplementation(() => null);
    const insertTagManagerFrameSpy = jest.spyOn(service, 'insertTagManagerFrame').mockImplementation(() => null);
    const makeAnalyticsImportScriptSpy = jest
      .spyOn(service, 'insertAnalyticImportScript')
      .mockImplementation(() => null);
    const makeAnalyticsScriptSpy = jest.spyOn(service, 'insertAnalyticScript').mockImplementation(() => null);

    jest.spyOn(service, 'hasGoogleAnalytics', 'get').mockReturnValue(true);

    service.init();

    expect(insertTagManagerScriptSpy).toHaveBeenCalled();
    expect(insertTagManagerFrameSpy).toHaveBeenCalled();
    expect(makeAnalyticsImportScriptSpy).not.toHaveBeenCalled();
    expect(makeAnalyticsScriptSpy).not.toHaveBeenCalled();
  });

  it('should be init when has TagManager', () => {
    const insertTagManagerScriptSpy = jest.spyOn(service, 'insertTagManagerScript').mockImplementation(() => null);
    const insertTagManagerFrameSpy = jest.spyOn(service, 'insertTagManagerFrame').mockImplementation(() => null);
    const makeAnalyticsImportScriptSpy = jest
      .spyOn(service, 'insertAnalyticImportScript')
      .mockImplementation(() => null);
    const makeAnalyticsScriptSpy = jest.spyOn(service, 'insertAnalyticScript').mockImplementation(() => null);

    jest.spyOn(service, 'hasTagManager', 'get').mockReturnValue(true);

    service.init();

    expect(insertTagManagerScriptSpy).not.toHaveBeenCalled();
    expect(insertTagManagerFrameSpy).not.toHaveBeenCalled();
    expect(makeAnalyticsImportScriptSpy).toHaveBeenCalled();
    expect(makeAnalyticsScriptSpy).toHaveBeenCalled();
  });

  it('should be insertTagManagerScript', () => {
    const element = {
      innerHTML: undefined
    };

    const createElementSpy = jest.spyOn(renderer, 'createElement').mockReturnValue(element);
    const setAttributeSpy = jest.spyOn(renderer, 'setAttribute');
    const appendChildSpy = jest.spyOn(renderer, 'appendChild');

    service.insertTagManagerScript();

    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(setAttributeSpy).toHaveBeenCalledWith(element, 'type', 'text/javascript');
    expect(element.innerHTML).toBeDefined();
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('should be insertTagManagerFrame', () => {
    const iframe = {};
    const noscript = {};

    const createElementSpy = jest.spyOn(renderer, 'createElement').mockReturnValue(iframe);
    const createElementSecondarySpy = jest.spyOn(renderer, 'createElement').mockReturnValue(noscript);
    const setAttributeSpy = jest.spyOn(renderer, 'setAttribute');
    const appendChildSpy = jest.spyOn(renderer, 'appendChild');
    const setStyleSpy = jest.spyOn(renderer, 'setStyle');
    const insertBeforeSpy = jest.spyOn(renderer, 'insertBefore');

    service.insertTagManagerFrame();

    expect(createElementSpy).toHaveBeenCalledWith('iframe');
    expect(setAttributeSpy).toHaveBeenCalledWith(
      iframe,
      'src',
      `https://www.googletagmanager.com/ns.html?id=${environment.TAG_MANAGER}`
    );
    expect(setAttributeSpy).toHaveBeenCalledWith(iframe, 'width', '0');
    expect(setAttributeSpy).toHaveBeenCalledWith(iframe, 'height', '0');
    expect(setStyleSpy).toHaveBeenCalledWith(iframe, 'display', 'none');
    expect(setStyleSpy).toHaveBeenCalledWith(iframe, 'visibility', 'hidden');
    expect(createElementSecondarySpy).toHaveBeenCalledWith('noscript');
    expect(setAttributeSpy).toHaveBeenCalledWith(noscript, 'id', TAG_MANAGER_ID);
    expect(appendChildSpy).toHaveBeenCalledWith(noscript, iframe);
    expect(insertBeforeSpy).toHaveBeenCalled();
  });

  it('should be insertAnalyticImportScript', () => {
    const element = {};

    const createElementSpy = jest.spyOn(renderer, 'createElement').mockReturnValue(element);
    const setAttributeSpy = jest.spyOn(renderer, 'setAttribute');
    const appendChildSpy = jest.spyOn(renderer, 'appendChild');

    service.insertAnalyticImportScript();

    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(setAttributeSpy).toHaveBeenCalledWith(
      element,
      'src',
      `https://www.googletagmanager.com/gtag/js?id=${environment.GOOGLE_ANALYTICS}`
    );
    expect(setAttributeSpy).toHaveBeenCalledWith(element, 'type', 'text/javascript');
    expect(appendChildSpy).toHaveBeenCalled();
  });

  it('should be insertAnalyticScript', () => {
    const element = {
      innerHTML: undefined
    };

    const createElementSpy = jest.spyOn(renderer, 'createElement').mockReturnValue(element);
    const setAttributeSpy = jest.spyOn(renderer, 'setAttribute');
    const appendChildSpy = jest.spyOn(renderer, 'appendChild');

    service.insertAnalyticScript();

    expect(createElementSpy).toHaveBeenCalledWith('script');
    expect(setAttributeSpy).toHaveBeenCalledWith(element, 'id', ANALYTICS_ID);
    expect(element.innerHTML).toBeDefined();
    expect(appendChildSpy).toHaveBeenCalled();
  });
});
