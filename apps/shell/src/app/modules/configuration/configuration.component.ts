import { Component, OnInit } from '@angular/core';
import { Navigation } from './interfaces/navigation.interface';
import { CONFIGURATION_ROUTES } from './constants/configuration-routes.constant';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ec-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  routes: Navigation[] = CONFIGURATION_ROUTES;
  activatedUrl: string;

  constructor(private router: Router) {
    router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          this.activatedUrl = value.url.split('/')[2];
        }
      }
    });
  }

  ngOnInit(): void {
    this.activatedUrl = this.router.url.split('/')[2];
  }
}
