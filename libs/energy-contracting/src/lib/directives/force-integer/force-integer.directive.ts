import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ecForceInteger]'
})
export class ForceIntegerDirective {
  @Output() tempValue: EventEmitter<any> = new EventEmitter();

  auxTempValue!: number | string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('keyup', ['$event'])
  handleKeypress(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    const key = event.key;

    if (key === '.' || event.key === ',') {
      this.renderer.setProperty(this.el.nativeElement, 'value', 123.4);
      this.renderer.setProperty(this.el.nativeElement, 'value', this.auxTempValue);
      this.tempValue.emit(this.auxTempValue);
      return;
    }

    if (!isNaN(+key)) {
      this.auxTempValue = value;
    }
  }

  @HostListener('input', ['$event'])
  handleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.auxTempValue = value;
    }
  }
}
