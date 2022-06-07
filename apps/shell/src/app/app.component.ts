import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ec-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  private path = './assets/icons';

  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private platform: Platform) {
    this.iconRegistry
      .addSvgIcon('ec_handshake', this.setPath(`${this.path}/handshake.svg`))
      .addSvgIcon('ec_search', this.setPath(`${this.path}/search.svg`))
      .addSvgIcon('ec_speech-bubble', this.setPath(`${this.path}/speech-bubble.svg`))
      .addSvgIcon('ec_thumb', this.setPath(`${this.path}/thumb-up.svg`))
      .addSvgIcon('ec_best-price', this.setPath(`${this.path}/best-price.svg`))
      .addSvgIcon('ec_auction', this.setPath(`${this.path}/auction.svg`))
      .addSvgIcon('ec_hadshake-star', this.setPath(`${this.path}/handshake-star.svg`))
      .addSvgIcon('ec_renewable-energy', this.setPath(`${this.path}/renewable-energy.svg`));

    this.parseScale();
  }

  setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  parseScale(): void {
    if (window.devicePixelRatio > 1) {
      if (this.checkNavigatorFirefoxOpera()) {
        const scale = window.devicePixelRatio > 1.25 ? window.innerWidth / window.outerWidth : 1;
        document.body.style.transformOrigin = '0 0';
        document.body.style.transform = `scale(${scale})`;
      }
    }
  }

  checkNavigatorFirefoxOpera(): boolean {
    return this.platform.FIREFOX || this.platform.WEBKIT;
  }
}
