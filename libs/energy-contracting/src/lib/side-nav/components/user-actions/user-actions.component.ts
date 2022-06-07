import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  Authentication,
  AuthState,
  Logout,
} from '../../../../../../auth-lib/src/public-api';
import { Menu } from '../../../menu/menu';

@Component({
  selector: 'ec-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss'],
})
export class UserActionsComponent {
  user: Authentication;
  list = this.menu.listMenu;

  constructor(
    private store: Store,
    private router: Router,
    private menu: Menu
  ) {
    this.user = this.store.selectSnapshot(AuthState);
  }

  logout(): void {
    this.store.dispatch(new Logout()).subscribe({
      next: () => this.router.navigateByUrl('auth'),
    });
  }

  trackByFn(index: number): number {
    return index;
  }

  isCustomIcon(name: string): boolean {
    return name.includes('ec_');
  }
}
