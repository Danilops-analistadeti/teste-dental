import { PermissionsAllowedTypes } from '../enums/permissions-allowed-types.enum';

export const ROUTER_PERMISSIONS = new Map<string, string>();

ROUTER_PERMISSIONS.set('/configuration', PermissionsAllowedTypes.COMPANY_GROUP);
