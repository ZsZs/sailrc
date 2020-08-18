import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class RouteStateService {
  private pathParameterState = new BehaviorSubject<{paramName, paramValue}>({paramName: '', paramValue: ''});
  private pathParameter: Observable<{paramName, paramValue}>;
  private urlSegment: Observable<string>;
  private urlSegmentState = new BehaviorSubject<string>('');

  constructor() {
    this.pathParameter = this.pathParameterState.asObservable();
    this.urlSegment = this.urlSegmentState.asObservable();
  }

  public updatePathParameterState( paramName: string, paramValue: string ) {
    this.pathParameterState.next({ paramName, paramValue });
  }

  public updateUrlSegmentState( segment: string ) {
    this.urlSegmentState.next( segment );
  }

  // properties
  getPathParameter(): Observable<{paramName, paramValue}> {
    return this.pathParameter;
  }

  getUrlSegment(): Observable<string> {
    return this.urlSegment;
  }
}
