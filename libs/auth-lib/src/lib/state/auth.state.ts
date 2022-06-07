import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Authenticate } from '../actions/authenticate';
import { Logout } from '../actions/logout';
import { Authentication } from '../interfaces/authentication.interface';

const AUTH_STATE_TOKEN = new StateToken<Authenticate>('authenticate');

@State<Authentication>({
  name: AUTH_STATE_TOKEN,
  defaults: undefined,
})
@Injectable()
export class AuthState {
  constructor(private store: Store) {}

  @Selector()
  static isLoggedIn(state: Authentication): boolean {
    return !!state && !!state.roles;
  }

  @Action(Authenticate)
  authenticate(
    { setState, patchState }: StateContext<Partial<Authentication>>,
    action: Authenticate
  ): void {
    if (!Object.keys(action.payload)?.length) {
      setState(action.payload);
    } else {
      patchState(action.payload);
    }
  }

  @Action(Logout)
  logout(): void {
    this.store.reset({});
  }
}
