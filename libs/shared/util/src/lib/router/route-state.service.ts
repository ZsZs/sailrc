import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouteStateService {
  private pathParameterState = new BehaviorSubject<{ paramName; paramValue }>({ paramName: '', paramValue: '' });
  private readonly pathParameter: Observable<{ paramName; paramValue }>;
  private routeSegmentsSubscription = new Map<string, Subscription>();
  public urlSegment: Observable<string>;
  private urlSegmentState = new BehaviorSubject<string>('');

  constructor() {
    this.pathParameter = this.pathParameterState.asObservable();
    this.urlSegment = this.urlSegmentState.asObservable();
  }

  public subscribeToRouteSegments(subscriber: string, route: ActivatedRoute): Observable<string> {
    const lastSegment = route.url.pipe(
      map((url) => {
        const lastSegment: string = url[url.length - 1].path;
        this.updateUrlSegmentState(lastSegment);
        return lastSegment;
      })
    );

    this.routeSegmentsSubscription.set(subscriber, lastSegment.subscribe());

    return lastSegment;
  }

  public unsubscribeFromRouteSegments(subscriber: string) {
    this.routeSegmentsSubscription.get(subscriber).unsubscribe();
    this.routeSegmentsSubscription.delete(subscriber);
  }

  public updatePathParameterState(paramName: string, paramValue: string) {
    this.pathParameterState.next({ paramName, paramValue });
  }

  public updateUrlSegmentState(segment: string) {
    this.urlSegmentState.next(segment);
  }

  // properties
  getPathParameter(): Observable<{ paramName; paramValue }> {
    return this.pathParameter;
  }

  getUrlSegment(): Observable<string> {
    return this.urlSegment;
  }
}
