import { Component, ElementRef, HostBinding, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TagColorType } from './types/tag-color.type';

@Component({
  selector: 'ec-tag',
  template: `
    <div class="esfera-tag-content">
      <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent {

  @HostBinding('class') styleClass = 'ec-tag';

  definedColor: TagColorType;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  @Input('color') get color() {
    return this.definedColor;
  }

  set color(value: TagColorType) {
    this.defineColor(value);
    this.definedColor = value;
  }

  defineColor(newColor: TagColorType) {
    if (this.definedColor) {
      this.elementRef.nativeElement.classList.remove(`ec-tag-${this.definedColor}`);
    }

    if (newColor) {
      this.elementRef.nativeElement.classList.add(`ec-tag-${newColor}`);
    }
  }
}
