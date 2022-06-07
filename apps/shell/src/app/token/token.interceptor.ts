import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from '@auth-lib';
import { quoteUnavailable } from '@energy-contracting';
import { Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WHITE_LIST } from './constants/white-list.constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public store: Store, private ngZone: NgZone, private router: Router) {}

  intercept(request: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
    const auth = this.store.selectSnapshot(AuthState);

    const whiteListed = new RegExp(WHITE_LIST.join('|')).test(request.url);
    const token = (auth?.roles && auth?.roles[0]?.token) || auth?.token;

    if (!whiteListed && auth && token) {
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((event) => {
        this.handleError(event);
        return throwError(event);
      })
    );
  }

  handleError(event: HttpErrorResponse): void {
    if (event instanceof HttpErrorResponse) {
      const url = this.router.routerState.snapshot.url;
      this.ngZone.run(() => {
        if (event.status === 401) {
          this.resetState(url);
        }
      });
    }
  }

  resetState(url: string): void {
    this.store.dispatch(new StateReset(AuthState)).subscribe({
      next: () => {
        if (url !== '/proposal') {
          this.router.navigateByUrl('auth');
        } else if (url === '/proposal') {
          this.router.navigateByUrl('/proposal/quote-unavailable', {
            state: { message: quoteUnavailable }
          });
        }
      }
    });
  }
}
