import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { environment } from 'environments/environment';
import { ANALYTICS_ID } from '../constants/analytics-id.constant';
import { ANALYTICS_SCRIPT } from '../constants/analytics-script.constant';
import { ANALYTICS_URL } from '../constants/analytics-url.constant';
import { TAG_MANAGER_ID } from '../constants/tag-manager-id.constant';
import { TAG_MANAGER_SCRIPT } from '../constants/tag-manager-script.constant';
import { TAG_MANAGER_URL } from '../constants/tag-manager-url.constant';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  init(): void {
    if (environment.TAG_MANAGER?.length && !this.hasTagManager) {
      this.insertTagManagerScript();
      this.insertTagManagerFrame();
    }

    if (environment.GOOGLE_ANALYTICS?.length && !this.hasGoogleAnalytics) {
      this.insertAnalyticImportScript();
      this.insertAnalyticScript();
    }
  }

  insertTagManagerScript(): void {
    const element = this.renderer.createElement('script');
    this.renderer.setAttribute(element, 'type', 'text/javascript');
    element.innerHTML = TAG_MANAGER_SCRIPT;
    this.renderer.appendChild(this.document.head, element);
  }

  insertTagManagerFrame(): void {
    const iframe = this.renderer.createElement('iframe');
    this.renderer.setAttribute(iframe, 'src', TAG_MANAGER_URL);
    this.renderer.setAttribute(iframe, 'width', '0');
    this.renderer.setAttribute(iframe, 'height', '0');
    this.renderer.setStyle(iframe, 'display', 'none');
    this.renderer.setStyle(iframe, 'visibility', 'hidden');

    const noscript = this.renderer.createElement('noscript');
    this.renderer.setAttribute(noscript, 'id', TAG_MANAGER_ID);
    this.renderer.appendChild(noscript, iframe);
    this.renderer.insertBefore(this.document.body, noscript, this.document.body.firstChild);
  }

  insertAnalyticImportScript(): void {
    const importGtagScript = this.renderer.createElement('script');
    this.renderer.setAttribute(importGtagScript, 'src', ANALYTICS_URL);
    this.renderer.setAttribute(importGtagScript, 'type', 'text/javascript');
    this.renderer.appendChild(this.document.head, importGtagScript);
  }

  insertAnalyticScript(): void {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'id', ANALYTICS_ID);
    script.innerHTML = ANALYTICS_SCRIPT;

    this.renderer.appendChild(this.document.head, script);
  }

  get hasTagManager(): boolean {
    return !!this.document.getElementById(TAG_MANAGER_ID);
  }

  get hasGoogleAnalytics(): boolean {
    return !!this.document.getElementById(ANALYTICS_ID);
  }
}
