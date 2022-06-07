import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthState } from '@auth-lib';
import { ConfirmRemoveModalComponent } from '@energy-contracting';
import { NotificationsService } from '@esferaenergia/esfera-ui';
import { Store } from '@ngxs/store';
import { userDisplayedColumns } from '../../constant/user-displayed-columns.constant';
import { userModalDetail } from '../../constant/user-modal-detail.constant';
import { userModal } from '../../constant/user-modal.constant';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { confirmRemoveModal } from './constants/confirm-remove-modal.constant';

@Component({
  selector: 'ec-user-detail-item',
  templateUrl: './user-detail-item.component.html',
  styleUrls: ['./user-detail-item.component.scss']
})
export class UserDetailItemComponent implements OnInit {
  @Input() user!: User;

  displayedColumns: string[] = userDisplayedColumns;
  dataSource!: MatTableDataSource<any>;
  isLoadingDelete!: boolean;

  localUser: User;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private notificationsService: NotificationsService,
    private store: Store
  ) {
    this.localUser = this.store.selectSnapshot(AuthState);
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    const data = { ...this.user.person, email: this.user.email };
    this.dataSource = new MatTableDataSource([data]);
  }

  openEditUser(): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      ...userModal,
      data: this.user
    });

    dialogRef.afterClosed().subscribe({
      next: (close) => {
        if (close) {
          this.userService.reloadUsers(close);
        }
      }
    });
  }

  openDetailModal(): void {
    this.dialog.open(UserDetailComponent, {
      ...userModalDetail,
      data: this.user
    });
  }

  openDeleteModal(): void {
    this.isLoadingDelete = true;

    const confirmRemoveModalComponent = this.dialog.open(ConfirmRemoveModalComponent, {
      ...confirmRemoveModal,
      data: this.user.person?.name
    });

    confirmRemoveModalComponent.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.deleteUser();
        } else {
          this.isLoadingDelete = false;
        }
      }
    });
  }

  deleteUser(): void {
    this.userService
      .deleteUser(this.user?.id)
      .subscribe({
        next: () => {
          this.notificationsService.success(`${this.user.person.name} apagado com sucesso!`);
          this.userService.reloadUsers(true);
        },
        error: ({ error }) => this.notificationsService.error(error)
      })
      .add(() => (this.isLoadingDelete = true));
  }
}
