import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { Observable, of, throwError } from 'rxjs';
import { userModalDetail } from '../../constant/user-modal-detail.constant';
import { userModal } from '../../constant/user-modal.constant';
import { usersFixture } from '../../fixture/user.fixture';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { confirmRemoveModal } from './constants/confirm-remove-modal.constant';
import { UserDetailItemComponent } from './user-detail-item.component';

export class MatDialogMock {
  open(): { afterClosed: () => Observable<{ action: boolean }> } {
    return {
      afterClosed: () => of({ action: true })
    };
  }

  close = () => {};

  componentInstance: {
    data: {};
  };
}

describe('UserDetailComponentItem', () => {
  let component: UserDetailItemComponent;
  let fixture: ComponentFixture<UserDetailItemComponent>;
  let userService: UserService;
  let notificationsService: NotificationsService;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailItemComponent],
      imports: [NgxMaskModule.forRoot(), NgxsModule.forRoot()],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        {
          provide: UserService,
          useValue: {
            editUser(user: User): void {},
            reloadUsers(choice: boolean): void {},
            deleteUser(userId: string): void {}
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailItemComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    notificationsService = TestBed.inject(NotificationsService);
    matDialog = TestBed.inject(MatDialog);
    component.user = usersFixture[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be onInit', () => {
    const initDataSourceSpy = spyOn(component, 'initDataSource').and.stub();

    component.ngOnInit();

    expect(initDataSourceSpy).toHaveBeenCalled();
  });

  it('should be detaSource defined', () => {
    component.initDataSource();

    expect(component.dataSource).toBeDefined();
  });

  it('should be success deleteUser', () => {
    component.user = usersFixture[0];
    const editUserSpy = spyOn(userService, 'deleteUser').and.returnValue(of(usersFixture[0]));
    const successSpy = spyOn(notificationsService, 'success').and.stub();

    component.deleteUser();

    const userSuccess = `${usersFixture[0].person.name} apagado com sucesso!`;

    expect(editUserSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalledWith(userSuccess);
  });

  it('should be error deleteUser', () => {
    component.user = usersFixture[0];
    const deleteUSerSpy = spyOn(userService, 'deleteUser').and.returnValue(throwError({ error: { message: 'error' } }));
    const errorSpy = spyOn(notificationsService, 'error').and.stub();

    component.deleteUser();

    expect(deleteUSerSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should be open modal edit user is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const reloadUsersSpy = spyOn(userService, 'reloadUsers').and.stub();

    component.openEditUser();

    expect(openSpy).toHaveBeenCalledWith(EditUserComponent, { ...userModal, data: usersFixture[0] });

    expect(reloadUsersSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open modal edit user is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const reloadUsersSpy = spyOn(userService, 'reloadUsers').and.stub();

    component.openEditUser();

    expect(openSpy).toHaveBeenCalledWith(EditUserComponent, { ...userModal, data: usersFixture[0] });

    expect(reloadUsersSpy).not.toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open modal user detail is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const reloadUsersSpy = spyOn(userService, 'reloadUsers').and.stub();

    component.user = usersFixture[0];
    component.openDetailModal();

    const datamodal = { ...userModalDetail, data: usersFixture[0] };

    expect(openSpy).toHaveBeenCalledWith(UserDetailComponent, datamodal);

    expect(reloadUsersSpy).not.toHaveBeenCalled();
  });

  it('should be open modal user detail is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);

    component.user = usersFixture[0];
    component.openDetailModal();

    const dataModal = { ...userModalDetail, data: usersFixture[0] };

    expect(openSpy).toHaveBeenCalledWith(UserDetailComponent, dataModal);
  });

  it('should be open confirm remove modal is return true', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const deleteUserSpy = spyOn(component, 'deleteUser').and.stub();

    component.openDeleteModal();

    expect(openSpy).toHaveBeenCalledWith(ConfirmRemoveModalComponent, {
      ...confirmRemoveModal,
      data: usersFixture[0].person.name
    });

    expect(deleteUserSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should be open confirm remove modal is return false', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(false) });

    const openSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    const deleteUserSpy = spyOn(component, 'deleteUser').and.stub();

    component.user = usersFixture[0];
    component.openDeleteModal();

    expect(openSpy).toHaveBeenCalledWith(ConfirmRemoveModalComponent, {
      ...confirmRemoveModal,
      data: usersFixture[0].person.name
    });

    expect(deleteUserSpy).not.toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });
});
