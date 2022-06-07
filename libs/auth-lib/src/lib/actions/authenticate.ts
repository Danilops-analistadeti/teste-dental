import { Authentication } from '../interfaces/authentication.interface';

export class Authenticate {
  static readonly type = '[Auth] authenticate';
  constructor(public payload: Partial<Authentication>) {}
}
