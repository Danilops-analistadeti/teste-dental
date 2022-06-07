import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { PermissionsService } from './permissions.service';

const permissionsMock = {
  roles: [
    {
      company: {
        name: 'ESFERA ENERGIA CONSULTORIA E GEST\u00c3O DE ENERGIA LTDA. ',
        id: '5f6e5050abc59806a16439ad',
        fantasyName: 'ESFERA'
      },
      name: 'Administrador ESFERA ENERGIA CONSULTORIA E GEST\u00c3O DE ENERGIA LTDA.',
      id: '5f6e5050abc59806a16439ae',
      features: [
        {
          name: 'Criar oferta',
          id: '5f6e504babc59806a16439a2',
          alias: 'CREATE_OFFER'
        },
      ],
      token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiNWY2ZTUwNTdhYmM1OTgwNmEx
      NjQzOWI3IiwidXNlcl9lbWFpbCI6InBlZHJvLmNhbmRpZG8uZXh0QGVzZmVyYWVuZXJnaWEuY29tLmJyIiwiY2
      9tcGFueV9pZCI6IjVmNmU1MDUwYWJjNTk4MDZhMTY0MzlhZCIsImFwcGxpY2F0aW9uX2lkIjoiNWY2ZTUwNDhhYm
      M1OTgwNmExNjQzOTljIiwiZXhwIjoxNjA5MzIyNzQ5LjB9.XOPNY1CLwkyfPSG0QZcyxNw6agswvJh2Sao6XrUPQVE`,
      application: {
        name: 'Contrata\u00e7\u00e3o de energia',
        id: '5f6e5048abc59806a164399c',
        alias: 'ENERGY_CONTRACTING'
      }
    }
  ],
  name: 'Pedro Henrique Candido Ferreira',
  id: '5f6e5057abc59806a16439b7',
  email: 'pedro.candido.ext@esferaenergia.com.br'
};

describe('PermissionsService', () => {
  let service: PermissionsService;
  let ngxPermissionsService: NgxPermissionsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPermissionsModule.forRoot(),
        NgxsModule.forRoot()
      ]
    });
    service = TestBed.inject(PermissionsService);
    ngxPermissionsService = TestBed.inject(NgxPermissionsService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be get permissions', () => {
    const getPermissionMock = { name: 'teste', validationFunction: () => true };
    const getPermissionSpy = spyOn(ngxPermissionsService, 'getPermission').and.returnValue(getPermissionMock);

    const getPermissionsResponse = service.getPermissions('teste');

    expect(getPermissionSpy).toHaveBeenCalled();
    expect(getPermissionsResponse).toBeTruthy();
  });

  it('should be get permissions with permission empty', () => {
    const getPermissionMock = { name: 'teste', validationFunction: () => true };
    const getPermissionSpy = spyOn(ngxPermissionsService, 'getPermission').and.returnValue(getPermissionMock);

    const getPermissionsResponse = service.getPermissions('');

    expect(getPermissionSpy).not.toHaveBeenCalled();
    expect(getPermissionsResponse).toBeUndefined();
  });

  it('should be set permissions', () => {
    const selectSnapshotSpy = spyOn(store, 'selectSnapshot').and.returnValue(permissionsMock);
    const loadPermissionsSpy = spyOn(ngxPermissionsService, 'loadPermissions').and.stub();

    service.setPermissions();

    expect(selectSnapshotSpy).toHaveBeenCalled();
    expect(loadPermissionsSpy).toHaveBeenCalled();
  });

  it('should be set permissions but roles undefined', () => {
    const selectSnapshotSpy = spyOn(store, 'selectSnapshot').and.returnValue({});
    const loadPermissionsSpy = spyOn(ngxPermissionsService, 'loadPermissions').and.stub();

    service.setPermissions();

    expect(selectSnapshotSpy).toHaveBeenCalled();
    expect(loadPermissionsSpy).not.toHaveBeenCalled();
  });
});

