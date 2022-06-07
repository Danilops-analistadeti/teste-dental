const agentMock: Agents = {
  fantasyName: '',
  id: '',
  cnpj: '',
  name: ''
};

const matDialogStub: Partial<MatDialog> = {
  closeAll: () => {},

  // @ts-ignore
  open: <T, D = any, R = any>(component: ComponentType<T>, config?: MatDialogConfig<D>): MatDialogRef<T, R> =>
    new MatDialogRef<T, R>(undefined, undefined)
};

const agentsServiceStub: Partial<AgentsService> = {
  getAgents: (page: number, itemsPerPage: number, query?: string): Observable<Agents[]> => of(),
  getAgentsExcel: (): Observable<string> => of()
};

const notificationServiceStub: Partial<NotificationsService> = {
  error: (message: string, dismissTime?: number): any => undefined
};

describe('OfferersComponent', () => {
  let component: OfferersComponent;
  let fixture: ComponentFixture<OfferersComponent>;

  let service: AgentsService;
  let dialog: MatDialog;
  let notification: NotificationsService;
  let base64Service: Base64Service;
  let fileDownloadService: FileDownloadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferersComponent],
      imports: [
        EsferaListTemplateModule,
        EsferaCardItemModule,
        RouterTestingModule,
        MatIconModule,
        NgxMaskModule,
        HttpClientTestingModule,
        EsferaLoadingModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: Base64Service,
          useValue: {
            base64ToBlob: (b64Data: string, sliceSize: number | undefined, type: string): Blob => new Blob()
          }
        },
        {
          provide: FileDownloadService,
          useValue: {
            download: (data: Blob, filename: string): void => {}
          }
        },
        { provide: NotificationsService, useValue: notificationServiceStub },
        { provide: AgentsService, useValue: agentsServiceStub },
        { provide: MatDialog, useValue: matDialogStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferersComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AgentsService);
    dialog = TestBed.inject(MatDialog);
    notification = TestBed.inject(NotificationsService);
    base64Service = TestBed.inject(Base64Service);
    fileDownloadService = TestBed.inject(FileDownloadService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load method', () => {
    const loadSpy = spyOn(component, 'load').and.stub();

    component.ngOnInit();

    expect(loadSpy).toHaveBeenCalled();
  });

  describe('load', () => {
    it('should return agents', () => {
      const mock = [agentMock];

      const getAgentsSpy = spyOn(service, 'getAgents').and.returnValue(of(mock));

      component.load();

      expect(getAgentsSpy).toHaveBeenCalledWith(1, 25, undefined);
      expect(component.rows).toEqual(mock);
      expect(component.subscription).toBeDefined();
    });

    it('should return agents with query filter', () => {
      component.page = 2;

      const mock = [agentMock];
      const query = 'test';

      const getAgentsSpy = spyOn(service, 'getAgents').and.returnValue(of(mock));

      component.load(query);

      expect(getAgentsSpy).toHaveBeenCalledWith(1, 25, query);
      expect(component.lastQuery).toEqual(query);
      expect(component.page).toEqual(1);
      expect(component.rows).toEqual(mock);
      expect(component.subscription).toBeDefined();
    });

    it('should return agents with pagination', () => {
      const mock = [agentMock];
      const nextPage = 5;

      const getAgentsSpy = spyOn(service, 'getAgents').and.returnValue(of(mock));

      component.load(component.lastQuery, nextPage);

      expect(getAgentsSpy).toHaveBeenCalledWith(nextPage, 25, undefined);
      expect(component.page).toEqual(nextPage);
      expect(component.rows).toEqual(mock);
      expect(component.subscription).toBeDefined();
    });
  });

  it('should open invite modal', () => {
    const openSpy = spyOn(dialog, 'open').and.stub();

    component.openInviteModal();

    expect(openSpy).toHaveBeenCalledWith(SendInviteComponent, sendInviteModal);
  });

  describe('exportOfferers', () => {
    it('should get offerers data, transform in blob and call download method', () => {
      const response = 'ABCDEFGHIJKLLMNOPQRSZ';
      const blob: Blob = new Blob();

      const getAgentsExcelSpy = spyOn(service, 'getAgentsExcel').and.returnValue(of(response));
      const base64ToBlobSpy = spyOn(base64Service, 'base64ToBlob').and.returnValue(blob);
      const fileDownloadServiceSpy = spyOn(fileDownloadService, 'download').and.stub();

      component.exportOfferers();

      expect(getAgentsExcelSpy).toHaveBeenCalled();
      expect(base64ToBlobSpy).toHaveBeenCalledWith(response, undefined, BlobExcel);
      expect(fileDownloadServiceSpy).toHaveBeenCalledWith(blob);
    });

    it('should show error notification', () => {
      const httpError = {
        error: {
          message: 'test'
        }
      };

      const getAgentsExcelSpy = spyOn(service, 'getAgentsExcel').and.returnValue(throwError(httpError));
      const errorSpy = spyOn(notification, 'error');

      component.exportOfferers();

      expect(getAgentsExcelSpy).toHaveBeenCalledBefore(notification.error);
      expect(errorSpy).toHaveBeenCalledWith(httpError.error.message);
    });
  });
});
