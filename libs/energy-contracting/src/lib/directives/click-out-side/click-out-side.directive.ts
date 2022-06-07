import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[ecClickOutSide]'
})
export class ClickOutSideDirective {
  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @Input() sidebarReference: HTMLElement;

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const nativeElement = this.elementRef.nativeElement;
    const clickedInside = nativeElement.contains(targetElement);
    const sidebar = this.sidebarReference ? this.sidebarReference.contains(targetElement) : false;
    if (!clickedInside && !sidebar) {
      this.clickOutside.emit(event);
    }
  }
}
