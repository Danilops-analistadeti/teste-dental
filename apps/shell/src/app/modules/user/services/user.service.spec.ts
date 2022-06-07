import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'environments/environment';
import { lgpdFixture } from '../fixture/terms-lgpd.fixture';
import { usersFixture } from '../fixture/user.fixture';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request get users', () => {
    service.getUsers().subscribe({
      next: (value) => expect(value).toEqual(usersFixture)
    });

    const req = httpMock.expectOne(environment.USERS);
    req.flush(usersFixture);
  });

  it('should request create user', () => {
    const userMock = usersFixture[1];
    service.createUser(userMock).subscribe({
      next: (value) => expect(value).toEqual(userMock)
    });

    const req = httpMock.expectOne(environment.USER);
    req.flush(userMock);
  });

  it('should request edit user', () => {
    const userMock = usersFixture[1];

    service.editUser(userMock, userMock.id).subscribe({
      next: (value) => expect(value).toEqual(userMock)
    });

    const req = httpMock.expectOne(`${environment.USER}${userMock.id}/`);
    req.flush(userMock);
  });

  it('should request delete user', () => {
    const userMock = usersFixture[1];

    service.deleteUser(userMock.id).subscribe({
      next: (value) => expect(value).toEqual(userMock)
    });

    const req = httpMock.expectOne(`${environment.USER}${userMock.id}/`);
    req.flush(userMock);
  });

  it('should request accept terms lgpd', () => {
    const userMock = usersFixture[1];
    const lgpdMock = lgpdFixture;

    service.acceptLgpdUser(userMock.id).subscribe({
      next: (value) => expect(value).toEqual(lgpdMock)
    });

    const req = httpMock.expectOne(`${environment.USERS}${userMock.id}/contracts/sign`);
    req.flush(lgpdMock);
  });
});
