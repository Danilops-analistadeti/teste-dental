import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { AuthState } from '@auth-lib';
import { PermissionsService, ROUTER_PERMISSIONS } from '@energy-contracting';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store, private permissionsService: PermissionsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.validate(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const fullPath = segments.reduce((path, currentSegment) => `${path}/${currentSegment.path}`, '');
    return this.validate(fullPath);
  }

  validate(url: string): boolean {
    this.permissionsService.setPermissions();

    const isLoggedIn = this.store.selectSnapshot(AuthState.isLoggedIn);

    const routerPermission = ROUTER_PERMISSIONS.get(url);

    const hasPermission = this.permissionsService.getPermissions(routerPermission);

    if (!hasPermission && routerPermission) {
      this.router.navigateByUrl('/error/forbbiden');
    }

    if (!isLoggedIn) {
      this.router.navigateByUrl('/auth');
    }

    return isLoggedIn;
  }
}
