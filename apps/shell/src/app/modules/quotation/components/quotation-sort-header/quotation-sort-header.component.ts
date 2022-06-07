import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuotationService } from '@energy-contracting';
import { Subject } from 'rxjs';
import { sortAnimations } from './animations/sort-animations';
import { ArrowViewStateTransition } from './interfaces/arrow-view-state-transition.interface';
import { Sort } from './interfaces/sort.interface';
import { Sortable } from './interfaces/sortable.interface';
import { SortDirection } from './type/sort-direction';
import { getSortDirectionCycle } from './util/get-sort-direction-cycle.util';

@Component({
  selector: 'ec-quotation-sort-header',
  templateUrl: './quotation-sort-header.component.html',
  styleUrls: ['./quotation-sort-header.component.scss'],
  animations: [
    sortAnimations.arrowPosition,
    sortAnimations.indicator,
    sortAnimations.arrowOpacity,
    sortAnimations.allowChildren
  ]
})
export class QuotationSortHeaderComponent implements OnInit {
  @Output() readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Input() start: 'asc' | 'desc' = 'asc';
  @Input() id: string;
  @Input() isDisabled: boolean;
  @Input() active: string;

  arrowDirection: SortDirection = '';
  actives: Subject<string> = new Subject();
  sortables = new Map<string, Sortable>();
  viewState: ArrowViewStateTransition;
  disableViewStateAnimation = false;
  showIndicatorHint = false;

  @Input() get disableClear(): boolean {
    return this.disabledClear;
  }
  set disableClear(v: boolean) {
    this.disabledClear = coerceBooleanProperty(v);
  }
  private disabledClear: boolean;

  get direction(): SortDirection {
    return this.sortDirection;
  }
  set direction(direction: SortDirection) {
    this.sortDirection = direction;
  }
  private sortDirection: SortDirection = '';

  constructor(private changeDetectRef: ChangeDetectorRef, private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.updateArrowDirection();
    this.setAnimationTransitionState({
      toState: this.isSorted() ? 'active' : this.arrowDirection
    });

    this.register(this);
    this.sortActivesSubscription();
  }

  sortActivesSubscription(): void {
    this.quotationService.sortActives.subscribe({
      next: () => {
        if (!this.isSorted()) {
          this.setIndicatorHintVisible(false);
          this.changeDetectRef.detectChanges();
        }
      }
    });
  }

  getArrowViewState(): string {
    const fromState = this.viewState.fromState;
    return (fromState ? `${fromState}-to-` : '') + this.viewState.toState;
  }

  setAnimationTransitionState(viewState: ArrowViewStateTransition): void {
    this.viewState = viewState;

    if (this.disableViewStateAnimation) {
      this.viewState = { toState: viewState.toState };
    }
  }

  register(sortable: Sortable): void {
    this.sortables.set(sortable.id, sortable);
  }

  deregister(sortable: Sortable): void {
    this.sortables.delete(sortable.id);
  }

  handleClick(): void {
    if (!this.isDisabled) {
      this.toggleOnInteraction();
    }
  }

  toggleOnInteraction(): void {
    this.sort();

    // Do not show the animation if the header was already shown in the right position.
    if (this.viewState.toState === 'hint' || this.viewState.toState === 'active') {
      this.disableViewStateAnimation = true;
    }

    // If the arrow is now sorted, animate the arrow into place. Otherwise, animate it away into
    // the direction it is facing.
    const viewState: ArrowViewStateTransition = this.isSorted()
      ? { fromState: this.arrowDirection, toState: 'active' }
      : { fromState: 'active', toState: this.arrowDirection };
    this.setAnimationTransitionState(viewState);

    this.showIndicatorHint = false;
  }

  getArrowDirectionState(): string {
    const active = this.isSorted ? 'active-' : '';
    return `${active}${this.arrowDirection}`;
  }

  sort(): void {
    const sortable: Sortable = {
      id: this.id,
      start: this.start,
      disableClear: false
    };

    if (this.active !== sortable.id) {
      this.active = sortable.id;
      this.direction = sortable.start ? sortable.start : this.start;
    } else {
      this.direction = this.getNextSortDirection(sortable);
    }

    this.updateArrowDirection();
    this.sortChange.emit({ active: this.active, direction: this.direction });
    this.quotationService.sortActives.next();
  }

  getNextSortDirection(sortable: Sortable): SortDirection {
    if (!sortable) {
      return '';
    }

    const disableClear = sortable.disableClear != null ? sortable.disableClear : this.disableClear;
    const sortDirectionCycle = getSortDirectionCycle(sortable.start || this.start, disableClear);

    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }

  updateArrowDirection(): void {
    this.arrowDirection = this.isSorted() ? this.direction : this.start || this.start;
  }

  isSorted(): boolean {
    return this.active === this.id && (this.direction === 'asc' || this.direction === 'desc');
  }

  setIndicatorHintVisible(visible: boolean): null {
    if (this.isDisabled && visible) {
      return;
    }

    this.showIndicatorHint = visible;

    if (!this.isSorted()) {
      this.updateArrowDirection();
      if (this.showIndicatorHint) {
        this.setAnimationTransitionState({
          fromState: this.arrowDirection,
          toState: 'hint'
        });
      } else {
        this.setAnimationTransitionState({
          fromState: 'hint',
          toState: this.arrowDirection
        });
      }
    }
  }
}
