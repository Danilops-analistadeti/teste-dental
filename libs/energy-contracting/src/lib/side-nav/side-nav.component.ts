import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { environment } from 'environments/environment';
import { createLocaleDateToUTC } from '../util/date.util';

@Component({
  selector: 'ec-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {
  isMenuOpen = false;
  dateNow: Date;

  version = environment.version;

  constructor(private changeDetectRef: ChangeDetectorRef) {
    setInterval(() => {
      this.dateNow = createLocaleDateToUTC();
      this.changeDetectRef.detectChanges();
    }, 1000);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
