import { ElementRef } from '@angular/core';
import { ClickOutSideDirective } from './click-out-side.directive';

describe('ClickOutSideDirective', () => {
  it('should create an instance', () => {
    const elementRef = new ElementRef({});
    const directive = new ClickOutSideDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
