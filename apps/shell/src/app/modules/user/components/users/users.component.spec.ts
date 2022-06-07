import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { userModal } from '../../constant/user-modal.constant';
import { CreateUserComponent } from '../create-user/create-user.component';
import { usersFixture } from '../../fixture/user.fixture';
import { UsersComponent } from './users.component';

class UserServiceStub {
  refreshUsers: Subject<boolean> = new Subject();
  getUsers = (): void => { }
}

export class MatDialogMock {
  open(): { afterClosed: () => Observable<{ action: boolean }> } {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: UserService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: UserService, useClass: UserServiceStub },
        { provide: MatDialog, useClass: MatDialogMock },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    matDialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ngOnInit', () => {
    const searchUsersSpy = spyOn(component, 'searchUsers').and.stub();
    const subscriptionUsersSpy = spyOn(component, 'subscriptionUsers').and.stub();

    component.ngOnInit();

    expect(searchUsersSpy).toHaveBeenCalled();
    expect(subscriptionUsersSpy).toHaveBeenCalled();
  });

  it('should be subscriptionUsers', () => {
    const searchUsersSpy = spyOn(component, 'searchUsers').and.stub();

    component.subscriptionUsers();

    userService.refreshUsers.next(true);

    expect(searchUsersSpy).toHaveBeenCalled();
  });

  it('should be searchUsers', () => {
    const getUsersSpy = spyOn(userService, 'getUsers').and.returnValue(of(usersFixture));

    component.searchUsers();

    expect(getUsersSpy).toHaveBeenCalled();
    expect(component.subscription).toBeDefined();
    expect(component.users).toEqual(usersFixture);
  });

  it('should be open modal edit user is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const searchUsersSpy = spyOn(component, 'searchUsers').and.stub();

    component.openCreateUserModal();

    expect(openSpy).toHaveBeenCalledWith(CreateUserComponent, userModal);

    expect(searchUsersSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
