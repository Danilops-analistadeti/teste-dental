import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsAllowedTypes } from '../enums/permissions-allowed-types.enum';
import { PermissionsService } from '../services/permissions.service';

@Injectable()
export class Menu {
  public listMenu = [
    {
      title: 'Configurações',
      icon: 'chevron_right',
      active: this.permissionsService.getPermissions(PermissionsAllowedTypes.COMPANY_GROUP),
      selected: false,
      onClick: () => this.router.navigate(['/configuration'])
    }
  ];

  constructor(
    @Inject(Router) private router: Router,
    @Inject(PermissionsService) private permissionsService: PermissionsService
  ) {}
}
