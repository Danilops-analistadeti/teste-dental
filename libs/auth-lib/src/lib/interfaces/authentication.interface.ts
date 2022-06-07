import { Role } from './role.interface';

export interface Authentication {
    email: string;
    name: string;
    id: string;
    roles: Role[];
    token?: string;
}
