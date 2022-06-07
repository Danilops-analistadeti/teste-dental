import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@sentry/angular';
import { Subscription } from 'rxjs';
import { userModal } from '../../constant/user-modal.constant';
import { UserService } from '../../services/user.service';
import { CreateUserComponent } from '../create-user/create-user.component';

@Component({
  selector: 'ec-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  subscription!: Subscription;
  errorMessage: string;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchUsers();
    this.subscriptionUsers();
  }

  subscriptionUsers(): void {
    this.userService.refreshUsers.subscribe({
      next: () => this.searchUsers()
    });
  }

  searchUsers(): void {
    this.subscription = this.userService.getUsers()?.subscribe({
      next: (value) => (this.users = value),
      error: ({ error }) => (this.errorMessage = error.message)
    });
  }

  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, userModal);

    dialogRef.afterClosed().subscribe({
      next: (close) => {
        if (close) {
          this.searchUsers();
        }
      }
    });
  }
}
