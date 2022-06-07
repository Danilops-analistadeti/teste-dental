import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Authentication, AuthState } from '../../../../auth-lib/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private permissionsService: NgxPermissionsService,
    private store: Store
  ) {}

  getPermissions(permission: string): boolean {
    if (permission) {
      const getPermission = this.permissionsService.getPermission(permission);

      const hasPermission = getPermission?.name === permission;

      return hasPermission;
    }
  }

  setPermissions(): void {
    const user: Authentication = this.store.selectSnapshot(AuthState);
    if (user?.roles) {
      const features = user.roles.map((role) => role.features)[0];
      const permissions = features.map((feature) => feature.alias);
      this.permissionsService.loadPermissions(permissions);
    }
  }
}
