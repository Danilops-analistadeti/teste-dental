import { Injectable, Type } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Route, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ActivatedRouteStub {
  url: Observable<UrlSegment[]>;
  params: Observable<Params> = of();
  queryParams: Observable<Params>;
  fragment: Observable<string>;
  data: Observable<Data> = of();
  outlet: string;
  component: string | Type<any>;

  get routeConfig(): Route {
    return;
  }

  get root(): ActivatedRoute {
    return;
  }

  get parent(): ActivatedRoute {
    return;
  }

  get firstChild(): ActivatedRoute {
    return;
  }

  get children(): ActivatedRoute[] {
    return;
  }

  get pathFromRoot(): ActivatedRoute[] {
    return;
  }

  get paramMap(): Observable<ParamMap> {
    return of(new Params());
  }

  get queryParamMap(): Observable<ParamMap> {
    return of();
  }

  toString(): string {
    return;
  }
}

class Params implements ParamMap {
  keys: string[];

  private routes: { [key: string]: string | null } = {
    subject: 'foo',
    time: 'd-123-1',
    device: 'all',
    location: 'c-123'
  };

  constructor() {
    this.keys = Object.keys(this.routes);
  }

  has(name: string): boolean {
    return;
  }

  get(name: string): string | null {
    return this.routes[name];
  }

  getAll(name: string): string[] {
    return [];
  }
}
