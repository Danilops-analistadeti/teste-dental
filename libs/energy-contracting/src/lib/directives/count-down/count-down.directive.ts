import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FullDate } from '../../interfaces/full-date.interface';

@Directive({
  selector: 'ecCountDown, [ecCountDown]'
})
export class CountDownDirective implements OnDestroy, OnInit {
  @Input() checkDateTime!: Date;
  @Input() toleranceTime!: Date;
  @Input() counter!: number;
  @Input() interval = 60000;
  @Output() value = new EventEmitter<FullDate>();
  @Output() checkExpired = new EventEmitter<boolean>();
  @Output() checkToleranceExpired = new EventEmitter<boolean>();

  private counterSource$ = new Subject<any>();
  private subscription = Subscription.EMPTY;

  constructor() {
    this.counterChanges();
  }

  ngOnInit(): void {
    this.getDiffDate();
  }

  counterChanges(): void {
    this.subscription = this.counterSource$
      .pipe(
        switchMap(({ interval, count }) =>
          timer(0, interval).pipe(
            tap(() => {
              this.value.emit({
                hour: count.hour,
                minute: count.minute--
              });

              if (!count.minute) {
                this.getDiffDate();
              }
            })
          )
        )
      )
      .subscribe();
  }

  getDiffDate(): void {
    const minute = moment(this.checkDateTime).diff(moment(), 'minutes');
    if (minute > 0) {
      this.counterSource$.next({ count: { minute }, interval: this.interval });
    } else {
      if (this.toleranceTime) {
        this.getDiffTolerance();
      } else {
        this.destroyed();
      }
    }
  }

  getDiffTolerance(): void {
    const minute = moment(this.toleranceTime).diff(moment(), 'minutes');

    if (minute > 0) {
      this.counterSource$.next({
        count: { minute },
        interval: this.interval
      });
      this.checkExpired.emit(true);
      return;
    } else {
      this.checkToleranceExpired.emit(true);
      this.destroyed();
    }
  }

  emitActiveStatus(diffDate: FullDate): void {
    this.counterSource$.next({ count: diffDate, interval: this.interval });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  destroyed(): void {
    this.value.emit();
    this.subscription.unsubscribe();
  }
}
