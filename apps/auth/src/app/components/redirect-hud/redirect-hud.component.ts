import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Authenticate, Authentication, AuthService } from '@auth-lib';
import { NotificationsService } from '@esferaenergia/esfera-ui/';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs/internal/observable/timer';
import { repeat } from 'rxjs/operators';
import { GENERIC_ERROR_MESSAGE } from './constants/generic-error-message.constant';
import { WRONG_PASSWORD_MESSAGE } from './constants/wrong-password-message.constant';

@Component({
  selector: 'ec-redirect-hud',
  templateUrl: './redirect-hud.component.html',
  styleUrls: ['./redirect-hud.component.scss']
})
export class RedirectHudComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  loadingPoints = '.';
  timerSubscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initRedirect();
  }

  ngOnDestroy(): void {
    this.unsubscribeTimer();
  }

  initRedirect(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.router.navigate([], { replaceUrl: true });
      this.login(paramMap.get('token'));
      this.initLoadAnimation();
    });
  }

  login(token: string): void {
    this.isLoading = true;
    this.authService
      .authenticateTokenHud(token)
      .subscribe({
        next: (response) => this.successAuthenticate(response),
        error: ({ status }) => this.errorAuthenticate(status)
      })
      .add(() => (this.isLoading = false));
  }

  errorAuthenticate(status: string): void {
    this.notificationService.error(status ? WRONG_PASSWORD_MESSAGE : GENERIC_ERROR_MESSAGE);
  }

  successAuthenticate(auth: Authentication): void {
    this.store.dispatch(new Authenticate(auth)).subscribe({
      next: () => {
        this.notificationService.clearAll();
        this.router.navigateByUrl('/quotation/create-quotation');
      }
    });
  }

  initLoadAnimation(): void {
    this.timerSubscription = timer(500)
      .pipe(repeat())
      .subscribe({
        next: () =>
          (this.loadingPoints = {
            1: '..',
            2: '...',
            3: '.'
          }[this.loadingPoints.length])
      });
  }

  unsubscribeTimer(): void {
    this.timerSubscription.unsubscribe();
  }
}
